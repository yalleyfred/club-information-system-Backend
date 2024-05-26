import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { MemberDuesPayment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberDuesPayment, EditMemberDuesPayment } from './dto/member-dues-payment.dto';

@Injectable()
export class MemberDuesPaymentDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async createMemberDuesPayment(userId: number, dto: CreateMemberDuesPayment) {
    const { memberId, lionYear, duesTypeId, amount } = dto;

    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    const existingDuesType = await this.prisma.duesType.findUnique({
      where: {
        id: duesTypeId,
      },
    });

    if (existingDuesType) throw new HttpException('Dues type already exist', 400);

    if (existingDuesType.userId !== userId)
      throw new ForbiddenException('Access to resource denied');

    return await this.prisma.memberDuesPayment.create({
      data: {
        memberId,
        lionYear,
        duesTypeId,
        amount,
        userId,
      },
    });
  }

  public async findManyByYear(userId: number, year: string): Promise<MemberDuesPayment[]> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    return await this.prisma.memberDuesPayment.findMany({
      where: {
        userId,
        lionYear: year,
        deletedAt: null,
      },
    });
  }

  public async findPaymentsByMemberId(userId: number, memberId: number, year: string) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    const payments: MemberDuesPayment[] = await this.prisma.memberDuesPayment.findMany({
      where: {
        memberId,
        userId,
        lionYear: year,
      },
    });

    if (!payments) throw new NotFoundException('Member does not have any payment record!');

    return payments;
  }

  public async getPaymentByPaymentId(
    userId: number,
    paymentId: number,
    memberId: number,
    year: string
  ) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    const payment = await this.prisma.memberDuesPayment.findFirst({
      where: {
        id: paymentId,
        userId,
        memberId,
        lionYear: year,
      },
    });

    if (!payment) throw new NotFoundException('Payment not found!');

    return payment;
  }

  public async updatePaymentByMemberId(
    userId: number,
    memberId: number,
    paymentId: number,
    year,
    dto: EditMemberDuesPayment
  ) {
    await this.getPaymentByPaymentId(userId, paymentId, memberId, year);

    return await this.prisma.memberDuesPayment.update({
      data: {
        ...dto,
      },
      where: {
        id: paymentId,
      },
    });
  }

  public async removePaymentByPaymentId(
    userId: number,
    paymentId: number,
    memberId: number,
    year: string
  ) {
    await this.getPaymentByPaymentId(userId, paymentId, memberId, year);

    return await this.prisma.memberDuesPayment.delete({
      where: {
        id: paymentId,
      },
    });
  }

  public async findManyByUserAndDuesType(
    userId: number,
    year: string,
    duesTypeId: number
  ): Promise<MemberDuesPayment[]> {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');
    return await this.prisma.memberDuesPayment.findMany({
      where: {
        duesTypeId,
        userId,
        lionYear: year,
        deletedAt: null,
      },
    });
  }
}
