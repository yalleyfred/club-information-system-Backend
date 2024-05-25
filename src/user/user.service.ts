import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async getAllUsers(adminId: number) {
    const user = await this.prisma.user.findFirst({
      where: { role: 'ADMIN', id: adminId, deletedAt: null },
    });

    console.log(user);
    if (!user) throw new UnauthorizedException('Access denied, Unauthprized');
    return this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  public async getUserById(adminId: number, userId: number) {
    const user = await this.prisma.user.findFirst({
      where: { role: 'ADMIN', id: adminId, deletedAt: null },
    });

    if (!user) throw new UnauthorizedException('Access denied, Unauthprized');

    return this.prisma.user.findFirst({
      where: { id: userId, role: 'ADMIN', deletedAt: null },
    });
  }

  public async updateUser(adminId: number, user: UpdateUserDto, userId: number) {
    const currentUser = await this.prisma.user.findFirst({
      where: { role: 'ADMIN', id: adminId, deletedAt: null },
    });

    if (!currentUser) throw new UnauthorizedException('Access denied, Unauthprized');

    const thisUser = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });

    if (!thisUser) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...user },
    });
  }

  public async deleteUser(adminId: number, userId: number) {
    const currentUser = await this.prisma.user.findFirst({
      where: { role: 'ADMIN', id: adminId, deletedAt: null },
    });

    if (!currentUser) throw new UnauthorizedException('Access denied, Unauthprized');

    const thisUser = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });

    if (!thisUser) throw new NotFoundException('User not found');

    return await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date(Date.now()) },
    });
  }
}
