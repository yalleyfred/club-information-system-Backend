import { Injectable } from '@nestjs/common';
import { MemberDuesPayment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberDuesPaymentDataAccessService {
  constructor(private readonly prisma: PrismaService) {}

  public async findManyByUser(userId: number, year: string): Promise<MemberDuesPayment[]> {
    return await this.prisma.memberDuesPayment.findMany({
      where: {
        userId,
        lionYear: year,
        deletedAt: null,
      },
    });
  }

  public async findManyByUserAndDuesType(
    userId: number,
    year: string,
    duesId: number
  ): Promise<MemberDuesPayment[]> {
    return await this.prisma.memberDuesPayment.findMany({
      where: {
        duesId,
        userId,
        lionYear: year,
        deletedAt: null,
      },
    });
  }
}
