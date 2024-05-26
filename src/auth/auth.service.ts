import { Injectable, HttpException } from '@nestjs/common';
import { SignInDto, SignUpDto, SetPasswordDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailService: MailService
  ) {}

  public async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');
    const expires = this.config.get('JWT_EXPIRES_IN');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: expires,
      secret: secret,
    });

    return {
      access_token,
    };
  }

  public async signUp(dto: SignUpDto) {
    try {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          name: dto.name,
          clubId: dto.clubId,
        },
      });

      if (existingUser) throw new HttpException('User Already exist', 400);
      const hashPassword = await argon.hash(dto.password);

      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hashPassword,
        },
      });
      const token = await this.signToken(user.id, user.email);

      await this.prisma.userVerification.create({
        data: {
          userId: user.id,
          token: token.access_token,
        },
      });

      const frontendUrl = 'http://localhost:1000/setPassword';
      const url = `${frontendUrl}?id=${user.id}&token=${token.access_token}`;

      const temp = '../templates/setPassword';
      const subject = 'Set Password';
      const context = {
        name: dto.name,
        email: dto.email,
        url: url,
      };
      // await this.mailService.sendUserMail(user.email, subject, temp, context);

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async signUpAdmin(adminId: number, adminRole: Role, dto: SignUpDto) {
    try {
      const existingAdmin = await this.prisma.user.findFirst({
        where: {
          id: adminId,
          role: adminRole,
        },
      });

      if (!existingAdmin || existingAdmin.role !== 'ADMIN')
        throw new HttpException('Access to resource denied', 401);

      const existingAdminWithMail = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (existingAdminWithMail) throw new HttpException('Administrator already exist', 400);

      const existingAdminWithClubId = await this.prisma.user.findUnique({
        where: {
          clubId: dto.clubId,
        },
      });

      if (existingAdminWithClubId) throw new HttpException('Administrator already exist', 400);

      const admin = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });

      const token = await this.signToken(admin.id, admin.email);

      await this.prisma.userVerification.create({
        data: {
          userId: admin.id,
          token: token.access_token,
        },
      });

      const frontendUrl = 'http://localhost:1000/setPassword';
      const url = `${frontendUrl}?id=${admin.id}&token=${token.access_token}`;

      const temp = '../templates/setPassword';
      const subject = 'Set Password';
      const context = {
        name: dto.name,
        email: dto.email,
        url: url,
      };

      // await this.mailService.sendUserMail(admin, subject, temp, context);
      return 'Success';
    } catch (error) {
      throw error;
    }
  }

  public async signIn(dto: SignInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new HttpException('User does not exist', 404);

      const passwordCheck = await argon.verify(user.password, dto.password);

      if (!passwordCheck) throw new HttpException('Credentials Incorrect', 400);

      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error;
    }
  }

  public async setPassword(dto: SetPasswordDto, userId: number, token: string) {
    try {
      const verifyUser = await this.prisma.userVerification.findUnique({
        where: {
          userId,
        },
      });

      if (verifyUser.token !== token) throw new HttpException('Invalid token, Access denied', 401);

      await this.prisma.userVerification.update({
        where: {
          userId,
        },
        data: {
          token: '',
        },
      });

      if (dto.password !== dto.confirmPassword)
        throw new HttpException('Password do not match', 400);

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) throw new HttpException('User does not exist', 404);
      const hashPassword = await argon.hash(dto.password);

      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashPassword,
        },
      });

      return 'Success';
    } catch (error) {
      throw error;
    }
  }
}
