import {
  Controller,
  Get,
  UseGuards,
  Patch,
  ParseIntPipe,
  Param,
  HttpException,
  Body,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  public async getUserById(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) userId: number
  ) {
    try {
      return await this.userService.getUserById(adminId, userId);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Get()
  public async getAllUsers(@GetUser('id') adminId: number) {
    try {
      return await this.userService.getAllUsers(adminId);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Patch(':id')
  public async updateUser(
    @GetUser('id') adminId: number,
    @Body() user: UpdateUserDto,
    @Param('id', ParseIntPipe) userId: number
  ) {
    try {
      return this.userService.updateUser(adminId, user, userId);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  @Delete(':id')
  public async deleteUser(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) userId: number
  ) {
    try {
      return this.userService.deleteUser(adminId, userId);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
