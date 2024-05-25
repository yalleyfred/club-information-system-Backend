import { HttpException, Injectable } from '@nestjs/common';
import { CreateTypeDto, EditTypeDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DuesTypeService {
  constructor(private prisma: PrismaService) {}

  public async createDuesType(adminId: number, dto: CreateTypeDto) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin || admin.role !== 'ADMIN')
        throw new HttpException('Access to resource denied', 401);

      const duesType = await this.prisma.duesType.findFirst({
        where: {
          name: dto.name,
        },
      });

      if (duesType) throw new HttpException('This type of dues already exist', 400);

      return await this.prisma.duesType.create({
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getDuesType(adminId: number, duesId: number) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin || admin.role !== 'ADMIN')
        throw new HttpException('Access to resource denied', 401);

      return await this.prisma.duesType.findFirst({
        where: {
          id: duesId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getDues(adminId: number) {
    const admin = await this.prisma.user.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin || admin.role !== 'ADMIN') throw new HttpException('Access to resource denied', 401);

    return await this.prisma.duesType.findMany();
  }

  public async editDuesType(adminId: number, duesId: number, dto: EditTypeDto) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin || admin.role !== 'ADMIN')
        throw new HttpException('Access to resource denied', 401);

      const duesType = await this.prisma.duesType.findFirst({
        where: {
          id: duesId,
        },
      });

      if (!duesType) throw new HttpException('This type of dues does not exist', 400);

      return await this.prisma.duesType.update({
        data: {
          ...dto,
        },
        where: {
          id: duesId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeDuesType(adminId: number, duesId: number) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin || admin.role !== 'ADMIN')
        throw new HttpException('Access to resource denied', 401);

      const duesType = await this.prisma.duesType.findFirst({
        where: {
          id: duesId,
        },
      });

      if (!duesType) throw new HttpException('This type of dues does not exist', 400);

      await this.prisma.duesType.delete({
        where: {
          id: duesId,
        },
      });
      return 'Success';
    } catch (error) {
      throw error;
    }
  }
}
