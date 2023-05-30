import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDuesDto {
    @IsString()
    @IsNotEmpty()
    lionYear: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNumber()
    @IsNotEmpty()
    duesTypeId: number;
}

export class EditDuesDto {
    @IsString()
    @IsOptional()
    lionYear?: string;

    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsNumber()
    @IsOptional()
    duesTypeId?: number;
}