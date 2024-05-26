import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePublicAccountDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsNumber()
  @IsNotEmpty()
  public opening: number;

  @IsNumber()
  @IsOptional()
  public contribution?: number;

  @IsNumber()
  @IsOptional()
  public donation?: number;

  @IsNumber()
  @IsOptional()
  public expenses?: number;

  @IsNumber()
  @IsOptional()
  public activityExpense?: number;

  @IsNumber()
  @IsNotEmpty()
  public closing: number;
}

export class EditPublicAccountDto {
  @IsNumber()
  @IsOptional()
  public contribution?: number;

  @IsNumber()
  @IsOptional()
  public donation?: number;

  @IsNumber()
  @IsOptional()
  public expenses?: number;

  @IsNumber()
  @IsOptional()
  public activityExpense?: number;
}
