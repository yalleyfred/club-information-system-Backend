import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class CreateExpenseDto {
    @IsNumber()
    @IsNotEmpty()
    expenseTypeId:number;

    @IsString()
    @IsNotEmpty()
    lionYear:string;

    @IsNumber()
    @IsNotEmpty()
    amount:number;

    @IsString()
    @IsOptional()
    notes?: string;

}

export class EditExpenseDto {
    @IsString()
    @IsOptional()
    lionYear?:string;

    @IsNumber()
    @IsOptional()
    amount?:number;

    @IsString()
    @IsOptional()
    notes?: string;
}