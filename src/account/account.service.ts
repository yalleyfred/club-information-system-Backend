import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Due,
  DuesType,
  MemberDuesPayment,
  Member,
  Income,
  Expense,
  ExpenseType,
} from 'prisma';
import { MailService } from 'src/mail/mail.service';
import * as pdf from 'pdfjs';
import { readFileSync } from 'fs';
import { IncomeType } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  public async createAdminAccount(userId: number, year: string) {
    try {
      const duesInfo = await this._getAllDuesTypeAndAmountOfClub(userId, year);
      const incomeInfo = await this._getAllIncomeAndAmountOfClub(userId, year);
      const expenseInfo = await this._getAllExpensesAndAmountOfClub(
        userId,
        year,
      );

      let incomeAdmin = incomeInfo.incomeType['ADMINISTRATION'];
      const incomeAmount = incomeInfo.incomeAmount;

      let expenseAdmin = expenseInfo.expenseType['ADMINISTRATION'];
      const expenseAmount = expenseInfo.expenseAmount;

      const income = [];
      const expense = [];

      if (incomeAdmin == undefined) {
        incomeAdmin = [];
      }

      if (expenseAdmin == undefined) {
        expenseAdmin = [];
      }

      // Convert incomeAmount and expenseAmount objects to arrays of key-value pairs
      const incomeArr = Object.entries(incomeAmount);
      const expenseArr = Object.entries(expenseAmount);

      // Create Map objects for faster key lookup
      const incomeMap = new Map(incomeArr);
      const expenseMap = new Map(expenseArr);

      // Iterate over incomeAdmin array and check if the key exists in the incomeMap
      for (let i = 0; i < incomeAdmin.length; i++) {
        if (incomeMap.has(incomeAdmin[i])) {
          income.push([incomeAdmin[i], incomeMap.get(incomeAdmin[i])]);
        }
      }

      // Iterate over expenseAdmin array and check if the key exists in the expenseMap
      for (let i = 0; i < expenseAdmin.length; i++) {
        if (expenseMap.has(expenseAdmin[i])) {
          expense.push([expenseAdmin[i], expenseMap.get(expenseAdmin[i])]);
        }
      }

      return {
        duesInfo,
        income,
        expense,
      };
    } catch (error) {
      throw error;
    }
  }

  public async createPublicAccount(userId: number, year: string) {
    try {
      const incomeInfo = await this._getAllIncomeAndAmountOfClub(userId, year);
      const expenseInfo = await this._getAllExpensesAndAmountOfClub(
        userId,
        year,
      );

      let incomePublic = incomeInfo.incomeType['ACTIVITY'];
      const incomeAmount = incomeInfo.incomeAmount;

      let expensePublic = expenseInfo.expenseType['ACTIVITY'];
      const expenseAmount = expenseInfo.expenseAmount;

      if (expensePublic == undefined) {
        expensePublic = [];
      }

      if (incomePublic == undefined) {
        incomePublic = [];
      }

      const income = [];
      const expense = [];

      // Convert incomeAmount and expenseAmount objects to arrays of key-value pairs
      const incomeArr = Object.entries(incomeAmount);
      const expenseArr = Object.entries(expenseAmount);

      // Create Map objects for faster key lookup
      const incomeMap = new Map(incomeArr);
      const expenseMap = new Map(expenseArr);

      // Iterate over incomePublic array and check if the key exists in the incomeMap
      for (let i = 0; i < incomePublic.length; i++) {
        if (incomeMap.has(incomePublic[i])) {
          income.push([incomePublic[i], incomeMap.get(incomePublic[i])]);
        }
      }

      // Iterate over expensePublic array and check if the key exists in the expenseMap
      for (let i = 0; i < expensePublic.length; i++) {
        if (expenseMap.has(expensePublic[i])) {
          expense.push([expensePublic[i], expenseMap.get(expensePublic[i])]);
        }
      }

      return {
        income,
        expense,
      };
    } catch (error) {
      throw error;
    }
  }

  public async createMemberAccountReport(
    userId: number,
    memberId: number,
    year: string,
  ) {
    try {
      const member: Member = await this.prisma.member.findFirst({
        where: {
          id: memberId,
          userId,
          deletedAt: null,
        },
        select: {
          email: true,
          lionMemberId: true,
          name: true,
          position: true,
          active: true,
          memberDuesPayment: {
            select: {
              lionYear: true,
              amount: true,

              dues: {
                select: {
                  id: true,
                  amount: true,

                  duesType: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      console.log(member.memberDuesPayment);
      const memberPayment: MemberDuesPayment = await Promise.all(
        member.memberDuesPayment,
      );

      const allDuesId = [];
      // Get unique duesId values
      const allDues: MemberDuesPayment[] = await Promise.all(
        Array.from(
          new Set(
            memberPayment.map(async (payment) => {
              const duesId = await payment.dues.duesType.id;
              if (!allDuesId.includes(duesId)) {
                allDuesId.push(duesId);
              }
            }),
          ),
        ),
      );

      const eachDuesPayment: MemberDuesPayment[] = await Promise.all(
        allDuesId.map((duesId) =>
          this.prisma.memberDuesPayment.findMany({
            where: {
              duesId: duesId,
              memberId,
              deletedAt: null,
              lionYear: year,
            },
          }),
        ),
      );
      console.log(eachDuesPayment);

      let duesTypeName = [];
      let duesTypeAmount = [];
      let dueses: DuesType[] = [];
      let theDueses: DuesType[] = memberPayment.map((due) => due.dues);
      for (let i = 0; i < theDueses.length; i++) {
        if (!duesTypeName.includes(theDueses[i].duesType.name)) {
          duesTypeName.push(theDueses[i].duesType.name);
          duesTypeAmount.push(theDueses[i].amount);
          dueses.push(theDueses[i]);
        }
      }

      const amountArr = duesTypeName.reduce((result, key) => {
        result[key] = 0;
        return result;
      }, {});

      const eachDuesAmount = duesTypeName.reduce((result, key) => {
        result[key] = 0;
        return result;
      }, {});

      dueses.forEach((obj: any, index: number) => {
        if (obj.id === allDuesId[index]) {
          eachDuesAmount[duesTypeName[index]] = obj.amount;
          // year = obj.lionYear
        }
      });

      const clubDuesPerMonth: number = eachDuesAmount['ClubDues'];
      const districtDuesPerMonth: number = eachDuesAmount['District Dues'];

      // Calculate total amounts for each dues type
      eachDuesPayment.forEach((array: any[], index: number) => {
        array.forEach((obj) => {
          if (obj.duesId === allDuesId[index]) {
            amountArr[duesTypeName[index]] += obj.amount;
          }
        });
      });
      console.log(amountArr);
      const clubDuesPaid: number = amountArr['ClubDues'];
      const districtDuesPaid: number = amountArr['District Dues'];

      const balance: {
        clubBal: number;
        districtBal: number;
      } = await this._calculateBalance(
        clubDuesPerMonth,
        clubDuesPaid,
        districtDuesPerMonth,
        districtDuesPaid,
      );

      const temp: string = '../templates/report';
      const subject: string = 'Membership Dues Report';
      const month: string = new Date().toLocaleString('default', {
        month: 'long',
      });

      const context = {
        year: year,
        month: month,
        name: member.name,
        email: member.email,
        position: member.position,
        clubDues: clubDuesPaid,
        districtDues: districtDuesPaid,
        clubDuesBalance: balance.clubBal,
        districtDuesBalance: balance.districtBal,
      };

      // await this.mail.sendUserMail(member.email, subject, temp, context);

      return {
        member,
        amountArr,
        eachDuesAmount,
      };
    } catch (error) {
      throw error;
    }
  }

  private async _calculateBalance(
    clubAmt: number,
    clubPaid: number,
    districtAmt: number,
    districtPaid: number,
  ): Promise<{
    clubBal: number;
    districtBal: number;
  }> {
    const clubBal = clubAmt * 12 - clubPaid;
    const districtBal = districtAmt * 12 - districtPaid;

    if (clubBal < 0) {
      throw new HttpException(
        `Balance cannot be negative, there will be an overpayment of ¢{clubBal}`,
        400,
      );
    } else if (districtBal < 0) {
      throw new HttpException(
        `Balance cannot be negative, there will be an overpayment of ¢{districtBal}`,
        400,
      );
    }
    return {
      clubBal,
      districtBal,
    };
  }

  private async _getAllExpensesAndAmountOfClub(userId: number, year: string) {
    try {
      const allExpensePayment: Expense[] = await this.prisma.expense.findMany({
        where: {
          userId,
          deletedAt: null,
          lionYear: year,
        },
      });

      const allExpenseId: number[] = Array.from(
        new Set(
          allExpensePayment.map((payment: Expense) => payment.expenseTypeId),
        ),
      );

      const allExpensePaymentById: Expense[][] = await Promise.all(
        allExpenseId.map((expenseTypeId) =>
          this.prisma.expense.findMany({
            where: {
              expenseTypeId,
              userId,
              lionYear: year,
              deletedAt: null,
            },
          }),
        ),
      );

      const types: ExpenseType[] = await Promise.all(
        allExpenseId.map((id) =>
          this.prisma.expenseType.findFirst({
            where: {
              id,
              deletedAt: null,
            },
          }),
        ),
      );

      const expenseTypekind: string[] = types.map(
        (type: ExpenseType) => type.type,
      );

      const theType = expenseTypekind.reduce((result, key) => {
        result[key] = [];
        return result;
      }, {});

      types.forEach((obj: ExpenseType, index: number) => {
        if (obj.type === expenseTypekind[index]) {
          theType[expenseTypekind[index]].push(obj.name);
        }
      });

      const expenseTypeName: string[] = types.map(
        (type: ExpenseType) => type.name,
      );

      const amountArr = expenseTypeName.reduce((result, key) => {
        result[key] = 0;
        return result;
      }, {});

      // Calculate total amounts for each dues type
      allExpensePaymentById.forEach((array: Expense[], index: number) => {
        array.forEach((obj: Expense) => {
          if (obj.expenseTypeId === allExpenseId[index]) {
            amountArr[expenseTypeName[index]] += obj.amount;
          }
        });
      });

      return {
        expenseType: theType,
        expenseAmount: amountArr,
      };
    } catch (error) {
      throw error;
    }
  }

  private async _getAllIncomeAndAmountOfClub(userId: number, year: string) {
    try {
      const allIncomePayment: Income[] = await this.prisma.income.findMany({
        where: {
          userId,
          lionYear: year,
          deletedAt: null,
        },
      });

      const allIncomeId: number[] = Array.from(
        new Set(
          allIncomePayment.map((payment: Income) => payment.incomeTypeId),
        ),
      );

      const allIncomePaymentById: Income[][] = await Promise.all(
        allIncomeId.map((incomeTypeId: Income) =>
          this.prisma.income.findMany({
            where: {
              incomeTypeId,
              userId,
              lionYear: year,
              deletedAt: null,
            },
          }),
        ),
      );

      const types: IncomeType[] = await Promise.all(
        allIncomeId.map((id: number) =>
          this.prisma.incomeType.findFirst({
            where: {
              id,
              deletedAt: null,
            },
          }),
        ),
      );

      const incomeTypeName: string[] = types.map(
        (type: IncomeType) => type.name,
      );
      const incomeTypekind: string[] = types.map(
        (type: IncomeType) => type.type,
      );

      const theType = incomeTypekind.reduce((result, key) => {
        result[key] = [];
        return result;
      }, {});

      types.forEach((obj: IncomeType, index: number) => {
        if (obj.type === incomeTypekind[index]) {
          theType[incomeTypekind[index]].push(obj.name);
        }
      });

      const amountArr = incomeTypeName.reduce((result, key) => {
        result[key] = 0;
        return result;
      }, {});

      // Calculate total amounts for each dues type
      allIncomePaymentById.forEach((array: Income[], index: number) => {
        array.forEach((obj: Income) => {
          if (obj.incomeTypeId === allIncomeId[index]) {
            amountArr[incomeTypeName[index]] += obj.amount;
          }
        });
      });

      return {
        // incomeName: incomeTypeName,
        incomeType: theType,
        incomeAmount: amountArr,
      };
    } catch (error) {
      throw error;
    }
  }

  private async _getAllDuesTypeAndAmountOfClub(userId: number, year: string) {
    try {
      // Retrieve all dues payments for the user
      const allDuesPayment: MemberDuesPayment[] =
        await this.prisma.memberDuesPayment.findMany({
          where: {
            userId,
            lionYear: year,
            deletedAt: null,
          },
        });

      // Get unique duesId values
      const allDuesId: number[] = Array.from(
        new Set(
          allDuesPayment.map((payment: MemberDuesPayment) => payment.duesId),
        ),
      );
      //   console.log(allDuesId);

      // Fetch dues payments by duesId
      const allduesPaymentById: MemberDuesPayment[] = await Promise.all(
        allDuesId.map((duesId: number) =>
          this.prisma.memberDuesPayment.findMany({
            where: {
              duesId,
              userId,
              lionYear: year,
              deletedAt: null,
            },
          }),
        ),
      );

      // Fetch all dues type details
      const allDuesTypeId: DuesType = allDuesId.map((duesId: number) =>
        this.prisma.due.findFirst({ where: { id: duesId, deletedAt: null } }),
      );
      const allDuesType: DuesType[] = await Promise.all(allDuesTypeId);

      // Fetch dues types by duesTypeId
      const types: DuesType[] = await Promise.all(
        allDuesType.map((due: DuesType) =>
          this.prisma.duesType.findFirst({
            where: {
              id: due.duesTypeId,
              deletedAt: null,
            },
          }),
        ),
      );

      // Get dues type names
      const duesTypeName: string[] = types.map((type: DuesType) => type.name);

      // Initialize amountArr object with dues type names as keys
      const amountArr = duesTypeName.reduce((result, key) => {
        result[key] = 0;
        return result;
      }, {});

      // Calculate total amounts for each dues type
      allduesPaymentById.forEach(
        (array: MemberDuesPayment[], index: number) => {
          array.forEach((obj: MemberDuesPayment) => {
            if (obj.duesId === allDuesId[index]) {
              amountArr[duesTypeName[index]] += obj.amount;
            }
          });
        },
      );

      return {
        duesName: duesTypeName,
        duesAmount: amountArr,
      };
    } catch (error) {
      throw error;
    }
  }
}
