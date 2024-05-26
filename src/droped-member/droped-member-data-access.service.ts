import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDropedMemberDto, EditDropedMemberDto } from './dto/droped-member.dto';

@Injectable()
export class DropedMemberDataAcessService {
  constructor(private prisma: PrismaService) {}

  public async getDropedMemberByMemberId(userId: number, memberId: number) {
    return await this.prisma.dropedMember.findFirst({
      where: {
        memberId: memberId,
        userId,
      },
    });
  }

  public async getDropedMemberByDropedId(userId: number, dropedId: number) {
    return await this.prisma.dropedMember.findFirst({
      where: {
        id: dropedId,
        userId,
      },
    });
  }

  public async setMemberToDroped(memberId: number) {
    return await this.prisma.member.update({
      data: {
        active: false,
      },
      where: {
        id: memberId,
      },
    });
  }

  public async setMemberToActive(memberId: number) {
    return await this.prisma.member.update({
      data: {
        active: true,
      },
      where: {
        id: memberId,
      },
    });
  }

  public async createDropedMember(userId: number, dto: CreateDropedMemberDto) {
    const { lionYear, dropedDate, activatedDate, memberId } = dto;

    return await this.prisma.dropedMember.create({
      data: {
        lionYear,
        dropedDate,
        activatedDate,
        memberId,
        userId,
      },
    });
  }

  public async getAllDropedMembers(userId: number) {
    return await this.prisma.dropedMember.findMany({
      where: {
        deletedAt: null,
        userId,
      },
    });
  }

  public async updateDropedMember(dropedId: number, dto: EditDropedMemberDto) {
    return await this.prisma.dropedMember.update({
      data: {
        ...dto,
      },
      where: {
        id: dropedId,
      },
    });
  }

  public async removeDropedMember(dropedId: number, date: Date) {
    return await this.prisma.dropedMember.update({
      data: {
        deletedAt: date,
      },
      where: {
        id: dropedId,
      },
    });
  }
}
