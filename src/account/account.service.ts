import { Injectable, HttpException } from '@nestjs/common';
import { Member } from 'prisma';
import { MailService } from 'src/mail/mail.service';
import * as pdf from 'pdfjs';
import { readFileSync } from 'fs';
import { AccountDataAccessService } from './account-data-access.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly mail: MailService,
    private readonly accountDataAccessService: AccountDataAccessService
  ) {}

  public async createAdminAccount(userId: number, year: string) {
    try {
      const duesInfo = await this.accountDataAccessService.getAllDuesTypeAndAmountOfClub(
        userId,
        year
      );
      const incomeInfo = await this.accountDataAccessService.getAllIncomeTypeAndAmountOfClub(
        userId,
        year
      );
      const expenseInfo = await this.accountDataAccessService.getAllExpenseTypeAndAmountOfClub(
        userId,
        year
      );

      return {
        duesInfo,
        income: incomeInfo['ADMINISTRATION'],
        expense: expenseInfo['ADMINISTRATION'],
      };
    } catch (error) {
      throw error;
    }
  }

  public async createPublicAccount(userId: number, year: string) {
    try {
      const incomeInfo = await this.accountDataAccessService.getAllIncomeTypeAndAmountOfClub(
        userId,
        year
      );
      const expenseInfo = await this.accountDataAccessService.getAllExpenseTypeAndAmountOfClub(
        userId,
        year
      );

      return {
        income: incomeInfo['ACTIVITY'],
        expense: expenseInfo['ACTIVITY'],
      };
    } catch (error) {
      throw error;
    }
  }

  public async createMemberAccountReport(userId: number, memberId: number, year: string) {
    try {
      const memberData: Member =
        await this.accountDataAccessService.getAllDuesTypeAndAmountOfClubMember(
          userId,
          memberId,
          year
        );
      const { memberDetails, memberDuesPaymentPerYearMap } = memberData;

      const balance: {
        clubBal: number;
        districtBal: number;
      } = await this._calculateBalance(
        memberDuesPaymentPerYearMap['club Dues perMonth'],
        memberDuesPaymentPerYearMap['club Dues'],
        memberDuesPaymentPerYearMap['district Dues perMonth'],
        memberDuesPaymentPerYearMap['district Dues']
      );

      const temp = '../templates/report';
      const subject = 'Membership Dues Report';
      const month: string = new Date().toLocaleString('default', {
        month: 'long',
      });

      const context = {
        year: year,
        month: month,
        name: memberDetails.name,
        email: memberDetails.email,
        position: memberDetails.position,
        clubDues: memberDuesPaymentPerYearMap['club Dues'],
        districtDues: memberDuesPaymentPerYearMap['district Dues'],
        clubDuesBalance: balance.clubBal,
        districtDuesBalance: balance.districtBal,
      };

      // await this.mail.sendUserMail(memberDetails.email, subject, temp, context);

      return 'mail sent';
    } catch (error) {
      throw error;
    }
  }

  private async _calculateBalance(
    clubAmt: number,
    clubPaid: number,
    districtAmt: number,
    districtPaid: number
  ): Promise<{
    clubBal: number;
    districtBal: number;
  }> {
    const clubBal = clubAmt * 12 - clubPaid;
    const districtBal = districtAmt * 12 - districtPaid;

    if (clubBal < 0) {
      throw new HttpException(
        `Balance cannot be negative, there will be an overpayment of ¢{clubBal}`,
        400
      );
    } else if (districtBal < 0) {
      throw new HttpException(
        `Balance cannot be negative, there will be an overpayment of ¢{districtBal}`,
        400
      );
    }
    return {
      clubBal,
      districtBal,
    };
  }
}
