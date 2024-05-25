import { Injectable } from '@nestjs/common';
import { Due } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DuesDataAccessService {
  constructor(private prisma: PrismaService) {}

  public async findFirst(duesId: number): Promise<Due> {
    return await this.prisma.due.findFirst({ where: { id: duesId, deletedAt: null } });
  }
}
