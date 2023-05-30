import { HttpException, Injectable } from '@nestjs/common';
import { CreateItemTypeDto, EditItemTypeDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExpenseTypeService {
    constructor(private prisma:PrismaService){}

    async createExpenseType(adminId:number, dto:CreateItemTypeDto) {
        try{
        const admin = await this.prisma.user.findUnique({
            where: {
                id:adminId,
            }
        });

        if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401)

        const expenseType = await this.prisma.expenseType.findFirst({
            where: {
                name:dto.name
            }
        });

        if(expenseType) throw new HttpException("This type of expense already exist", 400);

        return await this.prisma.expenseType.create({
            data: {
                ...dto
            }
        })
        
        }catch(error) {
            throw error
        }
    }

    async getExpenseType(adminId:number, expenseId:number) {
        try{
            const admin = await this.prisma.user.findUnique({
                where: {
                    id:adminId,
                }
            });
    
            if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

            return await this.prisma.expenseType.findFirst({
                where: {
                    id: expenseId
                }
            })
        }catch(error) {
            throw error
        }
    }

    async getAllExpenseType(adminId:number) {
        const admin = await this.prisma.user.findUnique({
            where: {
                id:adminId,
            }
        });

        if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

        return await this.prisma.expenseType.findMany()
    }

    async editExpenseType(adminId:number, expenseId:number, dto:EditItemTypeDto) {
        try{
            const admin = await this.prisma.user.findUnique({
                where: {
                    id:adminId,
                }
            });
    
            if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

            const expenseType = await this.prisma.expenseType.findFirst({
                where: {
                    id:expenseId
                }
            });
    
            if(!expenseType) throw new HttpException("This type of expense does not exist", 400);
    
            return await this.prisma.expenseType.update({
                data: {
                    ...dto
                },
                where: {
                    id:expenseId
                }
            });
        }catch(error) {
            throw error
        }
    }

    async removeExpenseType(adminId:number, expenseId:number) {
        try{
            const admin = await this.prisma.user.findUnique({
                where: {
                    id:adminId,
                }
            });
    
            if(!admin || admin.role !== 'ADMIN') throw new HttpException("Access to resource denied", 401);

            const expenseType = await this.prisma.expenseType.findFirst({
                where: {
                    id:expenseId
                }
            });
    
            if(!expenseType) throw new HttpException("This type of expense does not exist", 400);
    
             await this.prisma.expenseType.delete({
                where: {
                    id:expenseId
                }
            });
            return 'Success'
        
        }catch(error) {
            throw error
        }
    }
}
