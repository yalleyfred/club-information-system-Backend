import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActiveMemberDto, EditActiveMemberDto } from './dto/active-member.dto';
import { ActiveMember, Member } from 'prisma';

@Injectable()
export class ActiveMemberService {
    constructor(private prisma: PrismaService) {}

    public async createActiveMember(userId:number, dto: CreateActiveMemberDto) {
        try{

       const activeMembers: Member = await this.prisma.member.findMany({where: {userId, active: true}});

        return await this.prisma.activeMember.create({
            data: {
                lionYear: dto.lionYear,
                month: dto.month,
                activeMembers: activeMembers.length,
                userId
            }
        })

        }catch(error) {
            throw error
        }
    }

    public async getActiveMembers(userId:number) {
        try {

        return await this.prisma.activeMember.findMany({
            where: {
                deletedAt: null,
                userId
            }
        })
        
        }catch(error) {
            throw error
        }
    }

    public async getActiveMemberById(userId:number, activeId:number) {
        try {

            const activeMember: ActiveMember = await this.prisma.activeMember.findFirst({
                where: {
                    id: activeId,
                    userId,
                    deletedAt: null
                }
            });
    
            if(!activeMember) throw new NotFoundException()
    
            return activeMember
 
        }catch(error) {
            throw error
        }
    }

    public async updateActiveMember(userId:number, activeId:number, dto: EditActiveMemberDto) {
        try {

            const activeMember: ActiveMember = await this.prisma.activeMember.findFirst({
                where: {
                    id: activeId,
                    userId
                }
            });
    
            if(!activeMember) throw new NotFoundException()

            return await this.prisma.activeMember.update({
                data: {
                    ...dto
                },
                where: {
                    id: activeId,
                }
            })
        
        }catch(error) {
            throw error
        }
    }

    public async removeActiveMember(userId:number, activeId:number) {
        try {

            const activeMember: ActiveMember = await this.prisma.activeMember.findFirst({
                where: {
                    id: activeId,
                    userId
                }
            });
    
            if(!activeMember) throw new NotFoundException()

            const date = new Date()
            await this.prisma.activeMember.update({
                data: {
                    deletedAt: date
                },
                where: {
                    id: activeId
                }
            })
        }catch(error) {
            throw error
        }
    }

    private async getNumberOfActiveMembersPerMonth(userId: number) {
        try {
        
        const members: Member = await this.prisma.member.findMany({where: {userId, active: true}});
        
        return members.length;
        }catch(error) {
            throw error
        }
    }
}
