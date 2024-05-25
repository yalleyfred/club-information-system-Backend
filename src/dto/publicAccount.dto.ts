import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePublicAccountDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  opening: number;

  @IsNumber()
  @IsOptional()
  contribution?: number;

  @IsNumber()
  @IsOptional()
  donation?: number;

  @IsNumber()
  @IsOptional()
  expenses?: number;

  @IsNumber()
  @IsOptional()
  activityExpense?: number;

  @IsNumber()
  @IsNotEmpty()
  closing: number;
}

export class EditPublicAccountDto {
  @IsNumber()
  @IsOptional()
  contribution?: number;

  @IsNumber()
  @IsOptional()
  donation?: number;

  @IsNumber()
  @IsOptional()
  expenses?: number;

  @IsNumber()
  @IsOptional()
  activityExpense?: number;
}
