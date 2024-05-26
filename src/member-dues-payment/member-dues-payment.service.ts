import { Injectable } from '@nestjs/common';
import { CreateMemberDuesPayment, EditMemberDuesPayment } from './dto/member-dues-payment.dto';
import { MemberDuesPaymentDataAccessService } from './member-dues-payment-data-access.service';

@Injectable()
export class MemberDuesPaymentService {
  constructor(
    private readonly memberDuesPaymentDataAccessService: MemberDuesPaymentDataAccessService
  ) {}

  public async createMemberDuesPayment(userId: number, dto: CreateMemberDuesPayment) {
    try {
      return await this.memberDuesPaymentDataAccessService.createMemberDuesPayment(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getAllMemberDuesPaymentPerYear(userId: number, year: string) {
    try {
      return await this.memberDuesPaymentDataAccessService.findManyByYear(userId, year);
    } catch (error) {
      throw error;
    }
  }

  public async getMemberDuesPaymentByMemberId(userId: number, memberId: number, year: string) {
    try {
      return await this.memberDuesPaymentDataAccessService.findPaymentsByMemberId(
        userId,
        memberId,
        year
      );
    } catch (error) {
      throw error;
    }
  }

  public async updateMemberDuesPayment(
    userId: number,
    paymentId: number,
    memberId: number,
    year: string,
    dto: EditMemberDuesPayment
  ) {
    try {
      return await this.memberDuesPaymentDataAccessService.updatePaymentByMemberId(
        userId,
        memberId,
        paymentId,
        year,
        dto
      );
    } catch (error) {
      throw error;
    }
  }

  public async removeMemberDuesPayment(
    userId: number,
    paymentId: number,
    memberId: number,
    year: string
  ) {
    try {
      await this.memberDuesPaymentDataAccessService.removePaymentByPaymentId(
        userId,
        paymentId,
        memberId,
        year
      );

      return;
    } catch (error) {
      throw error;
    }
  }
}
