import { Controller, Get, UseGuards, Patch, ParseIntPipe, Param } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  @Get()
  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    let allUsers = [];
    for (let user of users) {
      delete user.password;
      allUsers.push(user.name);
    }

    return allUsers;
  }
}
