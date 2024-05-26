import { Injectable } from '@nestjs/common';
import { CreateTypeDto, EditTypeDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DuesTypeAccessService } from './dues-type-data-access.service';

@Injectable()
export class DuesTypeService {
  constructor(
    private prisma: PrismaService,
    private duesTypeAccessService: DuesTypeAccessService
  ) {}

  public async createDuesType(userId: number, dto: CreateTypeDto) {
    try {
      return await this.duesTypeAccessService.createDuesType(userId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async getDuesType(adminId: number, duesTypeId: number) {
    try {
      return await this.duesTypeAccessService.getDuesTypeById(adminId, duesTypeId);
    } catch (error) {
      throw error;
    }
  }

  public async getDues(adminId: number) {
    return await this.duesTypeAccessService.getAllDues(adminId);
  }

  public async editDuesType(adminId: number, duesTypeId: number, dto: EditTypeDto) {
    try {
      return await this.duesTypeAccessService.updateDuesType(adminId, duesTypeId, dto);
    } catch (error) {
      throw error;
    }
  }

  public async removeDuesType(adminId: number, duesTypeId: number) {
    try {
      return this.duesTypeAccessService.removeDuesType(adminId, duesTypeId);
    } catch (error) {
      throw error;
    }
  }
}
