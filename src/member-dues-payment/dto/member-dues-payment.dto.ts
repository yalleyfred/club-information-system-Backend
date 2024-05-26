import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPaymentQuery {
  @IsString()
  @IsNotEmpty()
  public year: string;

  @IsNumber()
  @IsNotEmpty()
  public memberId: number;
}
export class CreateMemberDuesPayment {
  @IsString()
  @IsNotEmpty()
  public lionYear: string;

  @IsNumber()
  @IsNotEmpty()
  public memberId: number;

  @IsNumber()
  @IsNotEmpty()
  public duesTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;
}

export class EditMemberDuesPayment {
  @IsString()
  @IsOptional()
  public lionYear?: string;

  @IsNumber()
  @IsOptional()
  public memberId?: number;

  @IsNumber()
  @IsOptional()
  public duesId?: number;

  @IsNumber()
  @IsOptional()
  public amount?: number;
}
