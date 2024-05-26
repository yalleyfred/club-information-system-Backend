import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto, EditExpenseDto } from './dto/expense.dto';

@Injectable()
export class ExpenseDataAccessService {
  constructor(private prisma: PrismaService) {}

  public async getExpense(userId: number, expenseId: number) {
    const expense = await this.prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
    });

    if (!expense) throw new NotFoundException('Expense item does not exist!');

    if (expense.userId !== userId) throw new ForbiddenException('Access to resource denied');

    return expense;
  }

  public async getAllExpense(userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    return await this.prisma.expense.findMany({
      where: {
        userId: userId,
      },
    });
  }

  public async createExpense(userId: number, dto: CreateExpenseDto) {
    const { lionYear, amount, notes, expenseTypeId } = dto;
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    return await this.prisma.expense.create({
      data: {
        lionYear,
        amount,
        notes,
        expenseTypeId,
        userId,
      },
    });
  }

  public async removeExpense(userId: number, expenseId: number) {
    await this.getExpense(userId, expenseId);
    return await this.prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });
  }

  public async updateExpense(userId: number, expenseId: number, dto: EditExpenseDto) {
    await this.getExpense(userId, expenseId);
    return await this.prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        ...dto,
      },
    });
  }
}
