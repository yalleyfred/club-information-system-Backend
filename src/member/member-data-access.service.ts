import { ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createMemberDto, EditMemberDto } from './dto/member.dto';

@Injectable()
export class MemberDataAccessService {
  constructor(private prisma: PrismaService) {}

  public async createMember(userId: number, dto: createMemberDto) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

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
  }

  public async getAllMember(userId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    return await this.prisma.member.findMany({
      where: {
        userId: userId,
      },
    });
  }

  public async getMember(userId: number, memberId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId } });

    if (!user) throw new NotFoundException('User does not exist!');

    const member = await this.prisma.member.findUnique({
      where: {
        id: memberId,
      },
    });

    if (member.userId !== userId) throw new ForbiddenException('Access to resource denied');

    if (!member) throw new NotFoundException('Member does not exist');

    return member;
  }

  public async updateMember(userId: number, memberId: number, dto: EditMemberDto) {
    await this.getMember(userId, memberId);

    return await this.prisma.member.update({
      where: {
        id: memberId,
      },
      data: {
        ...dto,
      },
    });
  }

  public async removeMember(userId: number, memberId: number) {
    await this.getMember(userId, memberId);

    return await this.prisma.member.delete({
      where: {
        id: memberId,
      },
    });
  }
}
