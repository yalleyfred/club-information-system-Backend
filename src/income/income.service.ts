import { Injectable, HttpException, ForbiddenException } from '@nestjs/common';
import { CreateIncomeDto, EditIncomeDto } from './dto/income.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IncomeService {
    constructor(private prisma: PrismaService) {}

    async createIncome(userId:number, dto:CreateIncomeDto) {
        try{

        return await this.prisma.income.create({
            data: {
                lionYear: dto.lionYear,
                amount: dto.amount,
                notes: dto.notes,
                incomeTypeId: dto.incomeTypeId,
                userId
            }
        });


        }catch(error) {
            throw error
        }
    }

    async getIncomeById(userId: number, incomeId: number) {
        try {
          const income = await this.prisma.income.findFirst({
            where: {
              id: incomeId,
              userId: userId,
            },
          });
    
          if (!income) throw new HttpException('Income does not exist', 404);
    
          return income;
        } catch (error) {
          throw error;
        }
      }

      async getAllIncome(userId: number) {
        try {
          return await this.prisma.income.findMany({
            where: {
              userId: userId,
            },
          });
        } catch (error) {
          throw error;
        }
      }

      async editIncome(userId: number, incomeId: number, dto: EditIncomeDto) {
        try {
          const income = await this.prisma.income.findUnique({
            where: {
              id: incomeId,
            },
          });
          if (!income || income.userId !== userId)
            throw new ForbiddenException('Access to resource denied');
    
          return await this.prisma.income.update({
            where: {
              id: incomeId,
            },
            data: {
              ...dto,
            },
          });
        } catch (error) {
          throw error;
        }
      }
    
      async removeIncome(userId: number, incomeId: number) {
        try {
          const income = await this.prisma.income.findUnique({
            where: {
              id: incomeId,
            },
          });
    
          if (!income || income.userId !== userId)
            throw new ForbiddenException('Access to resource denied');
    
          await this.prisma.income.delete({
            where: {
              id: incomeId,
            },
          });
        } catch (error) {
          throw error;
        }
      }
}


