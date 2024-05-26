import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateIncomeDto {
  @IsNumber()
  @IsNotEmpty()
  public incomeTypeId: number;

  @IsString()
  @IsNotEmpty()
  public lionYear: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsString()
  @IsOptional()
  public notes?: string;
}

export class EditIncomeDto {
  @IsString()
  @IsOptional()
  public lionYear?: string;

  @IsNumber()
  @IsOptional()
  public amount?: number;

  @IsString()
  @IsOptional()
  public notes?: string;
}
