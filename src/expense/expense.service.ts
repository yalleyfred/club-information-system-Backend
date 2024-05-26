import { Injectable } from '@nestjs/common';
import { CreateExpenseDto, EditExpenseDto } from './dto/expense.dto';
import { ExpenseDataAccessService } from './expense-data-access.service';

@Injectable()
export class ExpenseService {
  constructor(private readonly expenseDataAccessService: ExpenseDataAccessService) {}

  public async createExpense(userId: number, dto: CreateExpenseDto) {
    try {
      return await this.expenseDataAccessService.createExpense(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getExpenseById(userId: number, expenseId: number) {
    try {
      return await this.expenseDataAccessService.getExpense(userId, expenseId);
    } catch (error) {
      throw error;
    }
  }

  public async getAllExpense(userId: number) {
    try {
      return await this.expenseDataAccessService.getAllExpense(userId);
    } catch (error) {
      throw error;
    }
  }

  public async editExpense(userId: number, expenseId: number, dto: EditExpenseDto) {
    try {
      return await this.expenseDataAccessService.updateExpense(userId, expenseId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeExpense(userId: number, expenseId: number) {
    try {
      await this.expenseDataAccessService.removeExpense(userId, expenseId);
      return;
    } catch (error) {
      throw error;
    }
  }
}
