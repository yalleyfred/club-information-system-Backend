import { AccountType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class EditTypeDto {
  @IsString()
  name: string;
}

export class CreateItemTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: AccountType;
}

export class EditItemTypeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  type?: AccountType;
}
