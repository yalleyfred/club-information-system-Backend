import { Injectable, HttpException, ForbiddenException } from '@nestjs/common';
import { CreateExpenseDto, EditExpenseDto } from './dto/expense.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  public async createExpense(userId: number, dto: CreateExpenseDto) {
    try {
      return await this.prisma.expense.create({
        data: {
          lionYear: dto.lionYear,
          amount: dto.amount,
          notes: dto.notes,
          expenseTypeId: dto.expenseTypeId,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getExpenseById(userId: number, expenseId: number) {
    try {
      const expense = await this.prisma.expense.findFirst({
        where: {
          id: expenseId,
          userId: userId,
        },
      });

      if (!expense) throw new HttpException('Expense does not exist', 404);

      return expense;
    } catch (error) {
      throw error;
    }
  }

  public async getAllExpense(userId: number) {
    try {
      return await this.prisma.expense.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async editExpense(userId: number, expenseId: number, dto: EditExpenseDto) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id: expenseId,
        },
      });

      if (!expense || expense.userId !== userId)
        throw new ForbiddenException('Access to resource denied');

      return await this.prisma.expense.update({
        where: {
          id: expenseId,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeExpense(userId: number, expenseId: number) {
    try {
      const expense = await this.prisma.expense.findUnique({
        where: {
          id: expenseId,
        },
      });

      if (!expense || expense.userId !== userId)
        throw new ForbiddenException('Access to resource denied');

      await this.prisma.expense.delete({
        where: {
          id: expenseId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
