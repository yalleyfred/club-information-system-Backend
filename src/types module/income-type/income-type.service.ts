import { Injectable } from '@nestjs/common';
import { CreateItemTypeDto, EditItemTypeDto } from 'src/dto';
import { IncomeTypeAccessService } from './income-type-data-access.service';

@Injectable()
export class IncomeTypeService {
  constructor(private readonly incomeTypeAccessService: IncomeTypeAccessService) {}

  public async createIncomeType(adminId: number, dto: CreateItemTypeDto) {
    try {
      return await this.incomeTypeAccessService.createIncomeType(adminId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getIncomeType(adminId: number, incomeTypeId: number) {
    try {
      return await this.incomeTypeAccessService.getIncomeTypeById(adminId, incomeTypeId);
    } catch (error) {
      throw error;
    }
  }

  public async getAllIncomeType(adminId: number) {
    return await this.incomeTypeAccessService.getAllIncomeType(adminId);
  }

  public async editIncomeType(adminId: number, incomeTypeId: number, dto: EditItemTypeDto) {
    try {
      return await this.incomeTypeAccessService.updateIncomeType(adminId, incomeTypeId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeIncomeType(adminId: number, incomeTypeId: number) {
    try {
      return await this.incomeTypeAccessService.removeIncomeType(adminId, incomeTypeId);
    } catch (error) {
      throw error;
    }
  }
}
