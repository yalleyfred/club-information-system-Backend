import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDropedMemberDto {
    @IsString()
    @IsNotEmpty()
    lionYear:string;

    @IsString()
    @IsNotEmpty()
    dropedDate:string;

    @IsString()
    @IsOptional()
    activatedDate?:string;

    @IsNumber()
    @IsNotEmpty()
    memberId:number;
}

export class EditDropedMemberDto {
    @IsString()
    @IsOptional()
    lionYear?:string;

    @IsString()
    @IsOptional()
    dropedDate?:string;

    @IsString()
    @IsOptional()
    activatedDate?:string;

}