import { AccountType } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}

export class EditTypeDto {
  @IsString()
  public name: string;
}

export class CreateItemTypeDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public type: AccountType;
}

export class EditItemTypeDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsOptional()
  public type?: AccountType;
}
