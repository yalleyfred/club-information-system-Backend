import { Injectable } from '@nestjs/common';
import { CreateItemTypeDto, EditItemTypeDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpenseTypeAccessService } from './expense-type-data-access.service';

@Injectable()
export class ExpenseTypeService {
  constructor(
    private prisma: PrismaService,
    private readonly expenseTypeAccessService: ExpenseTypeAccessService
  ) {}

  public async createExpenseType(adminId: number, dto: CreateItemTypeDto) {
    try {
      return await this.expenseTypeAccessService.createExpenseType(adminId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getExpenseType(adminId: number, expenseId: number) {
    try {
      return await this.expenseTypeAccessService.getExpenseTypeById(adminId, expenseId);
    } catch (error) {
      throw error;
    }
  }

  public async getAllExpenseType(adminId: number) {
    return await this.expenseTypeAccessService.getAllExpenseType(adminId);
  }

  public async editExpenseType(adminId: number, expenseId: number, dto: EditItemTypeDto) {
    try {
      return await this.expenseTypeAccessService.updateDuesType(adminId, expenseId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeExpenseType(adminId: number, expenseId: number) {
    try {
      return await this.expenseTypeAccessService.removeDuesType(adminId, expenseId);
    } catch (error) {
      throw error;
    }
  }
}
