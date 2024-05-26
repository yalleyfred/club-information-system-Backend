import { Injectable } from '@nestjs/common';
import { CreateDuesDto, EditDuesDto } from './dto/dues.dto';
import { Due } from 'prisma';
import { DuesDataAccessService } from './dues-data-access.service';

@Injectable()
export class DuesService {
  constructor(private readonly duesDataAccessService: DuesDataAccessService) {}

  public async createDues(userId: number, dto: CreateDuesDto): Promise<Due> {
    try {
      return await this.duesDataAccessService.createDues(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getDues(userId: number): Promise<Due[]> {
    try {
      return await this.duesDataAccessService.getAllDues(userId);
    } catch (error) {
      throw error;
    }
  }

  public async getDuesById(userId: number, duesId: number): Promise<Due> {
    try {
      return await this.duesDataAccessService.getDues(userId, duesId);
    } catch (error) {
      throw error;
    }
  }

  public async updateDues(userId: number, duesId: number, dto: EditDuesDto): Promise<Due> {
    try {
      return await this.duesDataAccessService.updateDues(userId, duesId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeDues(userId: number, duesId: number): Promise<Due> {
    try {
      await this.duesDataAccessService.removeDues(userId, duesId);

      return;
    } catch (error) {
      throw error;
    }
  }
}
