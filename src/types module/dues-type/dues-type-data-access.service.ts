import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto, EditTypeDto } from '../dto/type.dto';

@Injectable()
export class DuesTypeAccessService {
  constructor(private prisma: PrismaService) {}

  public async createDuesType(userId: number, dto: CreateTypeDto) {
    await this.getDuesTypeByName(userId, dto.name);

    return await this.prisma.duesType.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  public async getDuesTypeByName(userId: number, name: string) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);
    const duesType = await this.prisma.duesType.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (duesType) throw new HttpException('This type of dues already exist', 400);

    return duesType;
  }

  public async getDuesTypeById(userId: number, duesTypeId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);
    const duesType = await this.prisma.duesType.findFirst({
      where: {
        id: duesTypeId,
        userId,
      },
    });

    if (duesType) throw new HttpException('This type of dues already exist', 400);

    return duesType;
  }

  public async getAllDues(userId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);

    return await this.prisma.duesType.findMany({
      where: {
        userId,
      },
    });
  }

  public async updateDuesType(userId: number, duesTypeId: number, dto: EditTypeDto) {
    await this.getDuesTypeById(userId, duesTypeId);

    return await this.prisma.duesType.update({
      data: {
        ...dto,
      },
      where: {
        id: duesTypeId,
      },
    });
  }

  public async removeDuesType(userId: number, duesTypeId: number) {
    await this.getDuesTypeById(userId, duesTypeId);

    return await this.prisma.duesType.delete({
      where: {
        id: duesTypeId,
      },
    });
  }
}
