import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SetPasswordDto, SignInDto, SignUpDto } from 'src/dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @UseGuards(JwtGuard)
  @Post('admin')
  signUpAdmin(@GetUser('id') adminId:number, @GetUser('role') adminRole:Role, @Body() dto: SignUpDto) {
    return this.authService.signUpAdmin(adminId, adminRole, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('setPassword')
  setPassword(
    @Query('id', ParseIntPipe) userId: number,
    @Body() dto: SetPasswordDto,
    @Query('token') token: string,
  ) {
    return this.authService.setPassword(dto, userId, token);
  }
}
