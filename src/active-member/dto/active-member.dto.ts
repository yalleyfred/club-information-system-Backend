import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Month } from '@prisma/client';
export class CreateActiveMemberDto {
  @IsString()
  @IsNotEmpty()
  public lionYear: string;

  @IsNotEmpty()
  public month: Month;
}

export class EditActiveMemberDto {
  @IsString()
  @IsOptional()
  public lionYear?: string;

  @IsOptional()
  public month?: Month;
}
