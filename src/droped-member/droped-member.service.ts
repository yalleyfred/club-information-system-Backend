import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDropedMemberDto, EditDropedMemberDto } from './dto/droped-member.dto';
import { DropedMember } from 'prisma';

@Injectable()
export class DropedMemberService {
  constructor(private prisma: PrismaService) {}

  public async createDropedMember(userId: number, dto: CreateDropedMemberDto) {
    try {
      const alreadyDropped: DropedMember = await this.prisma.dropedMember.findFirst({
        where: {
          memberId: dto.memberId,
          userId,
        },
      });

      if (alreadyDropped) throw new HttpException('Member has already been dropped!', 400);

      await this.prisma.member.update({
        data: {
          active: false,
        },
        where: {
          id: dto.memberId,
        },
      });

      return await this.prisma.dropedMember.create({
        data: {
          lionYear: dto.lionYear,
          dropedDate: dto.dropedDate,
          activatedDate: dto.activatedDate,
          memberId: dto.memberId,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getDropedMembers(userId: number) {
    try {
      return await this.prisma.dropedMember.findMany({
        where: {
          deletedAt: null,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getDropedMemberById(userId: number, dropedId: number) {
    try {
      const alreadyDropped: DropedMember = await this.prisma.dropedMember.findFirst({
        where: {
          id: dropedId,
          userId,
          deletedAt: null,
        },
      });

      if (!alreadyDropped) throw new NotFoundException();

      return alreadyDropped;
    } catch (error) {
      throw error;
    }
  }

  public async updateDropedMember(userId: number, dropedId: number, dto: EditDropedMemberDto) {
    try {
      const alreadyDropped: DropedMember = await this.prisma.dropedMember.findFirst({
        where: {
          id: dropedId,
          userId,
        },
      });

      if (!alreadyDropped) throw new NotFoundException();

      const details: string[] = [];

      details.push(dto.activatedDate, dto.lionYear, dto.dropedDate);
      if (details.includes(dto.activatedDate)) {
        await this.prisma.member.update({
          data: { active: true },
          where: { id: alreadyDropped.memberId },
        });
      }

      return await this.prisma.dropedMember.update({
        data: {
          ...dto,
        },
        where: {
          id: dropedId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async removeDropedMember(userId: number, dropedId: number) {
    try {
      const alreadyDropped: DropedMember = await this.prisma.dropedMember.findFirst({
        where: {
          id: dropedId,
          userId,
        },
      });

      if (!alreadyDropped) throw new NotFoundException();

      const date = new Date();

      await this.prisma.dropedMember.update({
        data: {
          deletedAt: date,
        },
        where: {
          id: dropedId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
