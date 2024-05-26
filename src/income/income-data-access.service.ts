import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIncomeDto, EditIncomeDto } from './dto/income.dto';

@Injectable()
export class IncomeDataAccessService {
  constructor(private prisma: PrismaService) {}

  public async getIncome(userId: number, incomeId: number) {
    const income = await this.prisma.income.findUnique({
      where: {
        id: incomeId,
      },
    });

    if (!income) throw new NotFoundException('income item does not exist!');

    if (income.userId !== userId) throw new ForbiddenException('Access to resource denied');

    return income;
  }

  public async getAllIncome(userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    return await this.prisma.income.findMany({
      where: {
        userId: userId,
      },
    });
  }

  public async createIncome(userId: number, dto: CreateIncomeDto) {
    const { lionYear, amount, notes, incomeTypeId } = dto;
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    return await this.prisma.income.create({
      data: {
        lionYear,
        amount,
        notes,
        incomeTypeId,
        userId,
      },
    });
  }

  public async removeIncome(userId: number, incomeId: number) {
    await this.getIncome(userId, incomeId);
    return await this.prisma.income.delete({
      where: {
        id: incomeId,
      },
    });
  }

  public async updateIncome(userId: number, incomeId: number, dto: EditIncomeDto) {
    await this.getIncome(userId, incomeId);
    return await this.prisma.expense.update({
      where: {
        id: incomeId,
      },
      data: {
        ...dto,
      },
    });
  }
}
