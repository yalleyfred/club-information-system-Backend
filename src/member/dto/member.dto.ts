import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createMemberDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lionMemberId: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public position: string;

  @IsBoolean()
  @IsOptional()
  public active?: boolean;
}

export class CreateNewMemberDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public phone: string;

  @IsString()
  @IsNotEmpty()
  public position: string;
}

export class EditMemberDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  @IsOptional()
  public position?: string;

  @IsBoolean()
  @IsOptional()
  public active?: boolean;
}
