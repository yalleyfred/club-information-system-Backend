import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  @IsNotEmpty()
  public expenseTypeId: number;

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

export class EditExpenseDto {
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
