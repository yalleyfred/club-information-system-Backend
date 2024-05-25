import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberDuesPayment, EditMemberDuesPayment } from './dto/member-dues-payment.dto';
import { MemberDuesPayment } from 'prisma';

@Injectable()
export class MemberDuesPaymentService {
  constructor(private prisma: PrismaService) {}

  public async createMemberDuesPayment(userId: number, dto: CreateMemberDuesPayment) {
    try {
      return await this.prisma.memberDuesPayment.create({
        data: {
          memberId: dto.memberId,
          lionYear: dto.lionYear,
          duesId: dto.duesId,
          amount: dto.amount,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getMemberDuesPayment(userId: number) {
    try {
      return await this.prisma.memberDuesPayment.findMany();
    } catch (error) {
      throw error;
    }
  }

  public async getMemberDuesPaymentById(userId: number, paymentId: number) {
    try {
      const payment: MemberDuesPayment = await this.prisma.memberDuesPayment.findFirst({
        where: {
          id: paymentId,
          userId,
        },
      });

      if (!payment) throw new NotFoundException();

      return await this.prisma.memberDuesPayment.findUnique({
        where: {
          id: paymentId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async updateMemberDuesPayment(
    userId: number,
    paymentId: number,
    dto: EditMemberDuesPayment
  ) {
    try {
      const payment: MemberDuesPayment = await this.prisma.memberDuesPayment.findFirst({
        where: {
          id: paymentId,
          userId,
        },
      });

      if (!payment) throw new NotFoundException();

      return await this.prisma.memberDuesPayment.update({
        data: {
          ...dto,
        },
        where: {
          id: paymentId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeMemberDuesPayment(userId: number, paymentId: number) {
    try {
      const payment: MemberDuesPayment = await this.prisma.memberDuesPayment.findFirst({
        where: {
          id: paymentId,
          userId,
        },
      });

      if (!payment) throw new NotFoundException();

      await this.prisma.memberDuesPayment.delete({
        where: {
          id: paymentId,
        },
      });

      return;
    } catch (error) {
      throw error;
    }
  }
}
