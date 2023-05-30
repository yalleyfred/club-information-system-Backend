import { Injectable, HttpException } from '@nestjs/common';
import { EditTypeDto, CreateTypeDto, CreateItemTypeDto, EditItemTypeDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IncomeTypeService {
    constructor(private prisma:PrismaService){}

    async createIncomeType(adminId:number,dto:CreateItemTypeDto) {
        try{
        const admin = await this.prisma.user.findUnique({
            where: {
                id:adminId,
            }
        });

        if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401)

        const incomeType = await this.prisma.incomeType.findFirst({
            where: {
                name:dto.name,
            }
        });

        if(incomeType) throw new HttpException("This type of Income already exist", 400);

        return await this.prisma.incomeType.create({
            data: {
                ...dto
            }
        })
        
        }catch(error) {
            throw error
        }
    }

    async getIncomeType(adminId:number, incomeId:number) {
        try{
            const admin = await this.prisma.user.findUnique({
                where: {
                    id:adminId,
                }
            });
    
            if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

            return await this.prisma.incomeType.findFirst({
                where: {
                    id: incomeId
                }
            })
        }catch(error) {
            throw error
        }
    }

    async getAllIncomeType(adminId:number) {
        const admin = await this.prisma.user.findUnique({
            where: {
                id:adminId,
            }
        });

        if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

        return await this.prisma.incomeType.findMany()
    }

    async editIncomeType(adminId:number, incomeId:number, dto:EditItemTypeDto) {
        try{
            const admin = await this.prisma.user.findUnique({
                where: {
                    id:adminId,
                }
            });
    
            if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

            const incomeType = await this.prisma.incomeType.findFirst({
                where: {
                    id:incomeId
                }
            });
    
            if(!incomeType) throw new HttpException("This type of Income does not exist", 400);
    
            return await this.prisma.incomeType.update({
                data: {
                    ...dto
                },
                where: {
                    id:incomeId
                }
            });
        }catch(error) {
            throw error
        }
    }

    async removeIncomeType(adminId:number, incomeId:number) {
        try{
            const admin = await this.prisma.user.findUnique({
                where: {
                    id:adminId,
                }
            });
    
            if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

            const incomeType = await this.prisma.incomeType.findFirst({
                where: {
                    id:incomeId
                }
            });
    
            if(!incomeType) throw new HttpException("This type of Income does not exist", 400);
    
             await this.prisma.incomeType.delete({
                where: {
                    id:incomeId
                }
            });
            return 'Success'
        
        }catch(error) {
            throw error
        }
    }
}
