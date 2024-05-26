import { Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public clubId: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public profile: string;

  @IsString()
  @IsOptional()
  public location: string;

  @IsString()
  @IsOptional()
  public role: Role;
}
