import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemTypeDto, EditItemTypeDto } from '../dto/type.dto';

@Injectable()
export class ExpenseTypeAccessService {
  constructor(private prisma: PrismaService) {}

  public async createExpenseType(userId: number, dto: CreateItemTypeDto) {
    await this.getExpenseTypeByName(userId, dto.name);

    return await this.prisma.expenseType.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  public async getExpenseTypeByName(userId: number, name: string) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);
    const expenseType = await this.prisma.expenseType.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (expenseType) throw new HttpException('This type of expense already exist', 400);

    return expenseType;
  }

  public async getExpenseTypeById(userId: number, expenseTypeId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);
    const expenseType = await this.prisma.expenseType.findFirst({
      where: {
        id: expenseTypeId,
        userId,
      },
    });

    if (expenseType) throw new HttpException('This type of expense already exist', 400);

    return expenseType;
  }

  public async getAllExpenseType(userId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);

    return await this.prisma.expenseType.findMany({
      where: {
        userId,
      },
    });
  }

  public async updateDuesType(userId: number, expenseTypeId: number, dto: EditItemTypeDto) {
    await this.getExpenseTypeById(userId, expenseTypeId);

    return await this.prisma.expenseType.update({
      data: {
        ...dto,
      },
      where: {
        id: expenseTypeId,
      },
    });
  }

  public async removeDuesType(userId: number, expenseTypeId: number) {
    await this.getExpenseTypeById(userId, expenseTypeId);

    return await this.prisma.expenseType.delete({
      where: {
        id: expenseTypeId,
      },
    });
  }
}
