import { Injectable } from '@nestjs/common';
import { CreateIncomeDto, EditIncomeDto } from './dto/income.dto';
import { IncomeDataAccessService } from './income-data-access.service';

@Injectable()
export class IncomeService {
  constructor(private readonly incomeDataAccessService: IncomeDataAccessService) {}

  public async createIncome(userId: number, dto: CreateIncomeDto) {
    try {
      return await this.incomeDataAccessService.createIncome(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getIncomeById(userId: number, incomeId: number) {
    try {
      return await this.incomeDataAccessService.getIncome(userId, incomeId);
    } catch (error) {
      throw error;
    }
  }

  public async getAllIncome(userId: number) {
    try {
      return await this.incomeDataAccessService.getAllIncome(userId);
    } catch (error) {
      throw error;
    }
  }

  public async editIncome(userId: number, incomeId: number, dto: EditIncomeDto) {
    try {
      return await this.incomeDataAccessService.updateIncome(userId, incomeId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeIncome(userId: number, incomeId: number) {
    try {
      return await this.incomeDataAccessService.removeIncome(userId, incomeId);
    } catch (error) {
      throw error;
    }
  }
}
