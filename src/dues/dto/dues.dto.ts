import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDuesDto {
  @IsString()
  @IsNotEmpty()
  public lionYear: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsNumber()
  @IsNotEmpty()
  public duesTypeId: number;
}

export class EditDuesDto {
  @IsString()
  @IsOptional()
  public lionYear?: string;

  @IsNumber()
  @IsOptional()
  public amount?: number;

  @IsNumber()
  @IsOptional()
  public duesTypeId?: number;
}
