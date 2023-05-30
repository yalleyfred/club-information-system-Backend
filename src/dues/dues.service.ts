import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDuesDto, EditDuesDto } from './dto/dues.dto';
import {Due} from "prisma"

@Injectable()
export class DuesService {
    constructor(private prisma: PrismaService) {}

    public async createDues(userId: number, dto: CreateDuesDto) {
        try{
        const existingDues: Due = await this.prisma.due.findFirst({
            where: {duesTypeId: dto.duesTypeId}
        });

        if(existingDues) throw new HttpException("Dues already exist", 400);

        return await this.prisma.due.create({
            data: {
                lionYear: dto.lionYear,
                amount: dto.amount,
                duesTypeId: dto.duesTypeId,
                userId
            }
        })

        }catch(error) {
            throw error
        }
    }

    public async getDues(userId:number) {
        try{
            return await this.prisma.due.findMany()
        }catch(error) {
            throw error
        }
    }

    public async getDuesById(userId: number, duesId: number) {
        try{
        const dues: Due = await this.prisma.due.findFirst({
            where: {
                id: duesId,
                userId
            }
        });

        if(!dues) throw new NotFoundException();
        return dues

        }catch(error) {
            throw error
        }
    }

    public async updateDues(userId:number, duesId: number, dto: EditDuesDto) {
        try{
           
            const dues: Due = await this.prisma.due.findFirst({
                where: {
                    id: duesId,
                    userId
                }
            });
    
            if(!dues) throw new NotFoundException();
            
            return await this.prisma.due.update({
                data: {
                    ...dto
                },
                where: {
                    id: duesId,
                    
                }
            })
        
        }catch(error) {
            throw error
        }
    }

    public async removeDues(userId:number, duesId:number) {
        try{
        
            const dues: Due = await this.prisma.due.findFirst({
                where: {
                    id: duesId,
                    userId
                }
            });
    
            if(!dues) throw new NotFoundException();
        
            await this.prisma.due.delete({
                where: {
                    id: duesId
                }
            })
            
            return 

        }catch(error) {
            throw error
        }
    }
}
