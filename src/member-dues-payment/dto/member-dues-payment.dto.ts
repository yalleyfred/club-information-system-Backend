import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMemberDuesPayment {
  @IsString()
  @IsNotEmpty()
  lionYear: string;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @IsNumber()
  @IsNotEmpty()
  duesId: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class EditMemberDuesPayment {
  @IsString()
  @IsOptional()
  lionYear?: string;

  @IsNumber()
  @IsOptional()
  memberId?: number;

  @IsNumber()
  @IsOptional()
  duesId?: number;

  @IsNumber()
  @IsOptional()
  amount?: number;
}
