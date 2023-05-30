import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import {Month} from "@prisma/client"
export class CreateActiveMemberDto {
    @IsString()
    @IsNotEmpty()
    lionYear:string;

    @IsNotEmpty()
    month:Month;

    
}

export class EditActiveMemberDto {
    @IsString()
    @IsOptional()
    lionYear?:string;

    @IsOptional()
    month?:Month;

}