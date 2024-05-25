import { Injectable, HttpException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { createMemberDto, EditMemberDto } from 'src/member/dto/member.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  public async createMember(dto: createMemberDto, userId: number) {
    try {
      const existingMember = await this.prisma.member.findUnique({
        where: {
          lionMemberId: dto.lionMemberId,
        },
      });

      if (existingMember) throw new HttpException('Member already exist', 400);

      return await this.prisma.member.create({
        data: {
          ...dto,
          userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getMembers(userId: number) {
    try {
      return await this.prisma.member.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async getMember(userId: number, memberId: number) {
    try {
      const member = await this.prisma.member.findFirst({
        where: {
          id: memberId,
          userId,
        },
      });

      if (!member) throw new NotFoundException();

      return member;
    } catch (error) {
      throw error;
    }
  }

  public async editMember(userId: number, memberId: number, dto: EditMemberDto) {
    try {
      const member = await this.prisma.member.findUnique({
        where: {
          id: memberId,
        },
      });

      if (!member || member.userId !== userId)
        throw new ForbiddenException('Access to resource denied');

      return await this.prisma.member.update({
        where: {
          id: memberId,
        },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public async dropMember(userId: number, memberId: number) {
    try {
      const member = await this.prisma.member.findUnique({
        where: {
          id: memberId,
        },
      });

      if (!member || member.userId !== userId)
        throw new ForbiddenException('Access to resource denied');

      await this.prisma.member.delete({
        where: {
          id: memberId,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
