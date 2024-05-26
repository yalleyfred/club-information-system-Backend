import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Due } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDuesDto, EditDuesDto } from './dto/dues.dto';

@Injectable()
export class DuesDataAccessService {
  constructor(private prisma: PrismaService) {}

  public async getDues(userId: number, duesId: number): Promise<Due> {
    const dues = await this.prisma.due.findFirst({
      where: { id: duesId, userId, deletedAt: null },
    });

    if (!dues) throw new NotFoundException();

    return dues;
  }

  public async getAllDues(userId: number): Promise<Due[]> {
    return await this.prisma.due.findMany({ where: { userId, deletedAt: null } });
  }

  public async createDues(userId: number, dto: CreateDuesDto): Promise<Due> {
    const { lionYear, amount, duesTypeId } = dto;

    const existingDues: Due = await this.getDues(userId, duesTypeId);

    if (existingDues) throw new HttpException('Dues already exist', 400);
    return await this.prisma.due.create({
      data: {
        lionYear,
        amount,
        duesTypeId,
        userId,
      },
    });
  }

  public async updateDues(userId, duesId: number, dto: EditDuesDto): Promise<Due> {
    await this.getDues(userId, duesId);
    return await this.prisma.due.update({
      data: {
        ...dto,
      },
      where: {
        id: duesId,
      },
    });
  }

  public async removeDues(userId: number, duesId: number): Promise<Due> {
    await this.getDues(userId, duesId);

    return await this.prisma.due.delete({
      where: {
        id: duesId,
      },
    });
  }
}
