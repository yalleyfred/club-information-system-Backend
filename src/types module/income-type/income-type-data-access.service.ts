import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemTypeDto, EditItemTypeDto } from '../dto/type.dto';

@Injectable()
export class IncomeTypeAccessService {
  constructor(private prisma: PrismaService) {}

  public async createIncomeType(userId: number, dto: CreateItemTypeDto) {
    await this.getIncomeTypeByName(userId, dto.name);

    return await this.prisma.incomeType.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  public async getIncomeTypeByName(userId: number, name: string) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);
    const incomeType = await this.prisma.incomeType.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (incomeType) throw new HttpException('This type of income already exist', 400);

    return incomeType;
  }

  public async getIncomeTypeById(userId: number, incomeTypeId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);
    const incomeType = await this.prisma.incomeType.findFirst({
      where: {
        id: incomeTypeId,
        userId,
      },
    });

    if (incomeType) throw new HttpException('This type of income already exist', 400);

    return incomeType;
  }

  public async getAllIncomeType(userId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);

    return await this.prisma.incomeType.findMany({
      where: {
        userId,
      },
    });
  }

  public async updateIncomeType(userId: number, incomeTypeId: number, dto: EditItemTypeDto) {
    await this.getIncomeTypeById(userId, incomeTypeId);

    return await this.prisma.incomeType.update({
      data: {
        ...dto,
      },
      where: {
        id: incomeTypeId,
      },
    });
  }

  public async removeIncomeType(userId: number, incomeTypeId: number) {
    await this.getIncomeTypeById(userId, incomeTypeId);

    return await this.prisma.incomeType.delete({
      where: {
        id: incomeTypeId,
      },
    });
  }
}
