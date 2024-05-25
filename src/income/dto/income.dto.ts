import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  @IsNotEmpty()
  incomeTypeId: number;

  @IsString()
  @IsNotEmpty()
  lionYear: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class EditIncomeDto {
  @IsString()
  @IsOptional()
  lionYear?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
