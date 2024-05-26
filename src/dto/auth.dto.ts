import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  public password?: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public clubId: string;

  @IsOptional()
  public role?: Role;
}

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class SetPasswordDto {
  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public confirmPassword: string;
}
