import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, isNumber } from 'class-validator';

export class createMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lionMemberId:string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsBoolean()
  @IsOptional()
  active?:boolean;
}

export class CreateNewMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  position: string;
}

export class EditMemberDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsBoolean()
  @IsOptional()
  active?:boolean;
}
