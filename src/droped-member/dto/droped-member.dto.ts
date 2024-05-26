import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDropedMemberDto {
  @IsString()
  @IsNotEmpty()
  public lionYear: string;

  @IsString()
  @IsNotEmpty()
  public dropedDate: string;

  @IsString()
  @IsOptional()
  public activatedDate?: string;

  @IsNumber()
  @IsNotEmpty()
  public memberId: number;
}

export class EditDropedMemberDto {
  @IsString()
  @IsOptional()
  public lionYear?: string;

  @IsString()
  @IsOptional()
  public dropedDate?: string;

  @IsString()
  @IsOptional()
  public activatedDate?: string;
}
