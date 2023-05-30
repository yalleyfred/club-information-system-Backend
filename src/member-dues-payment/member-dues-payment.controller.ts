import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { MemberDuesPaymentService } from './member-dues-payment.service';
import { GetUser } from 'src/auth/decorator';
import { CreateMemberDuesPayment, EditMemberDuesPayment } from './dto/member-dues-payment.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('member-dues-payment')
export class MemberDuesPaymentController {
    constructor(private readonly memberDuesPaymentService: MemberDuesPaymentService) {}

    @Post()
    createMemberDuesPayment(@GetUser('id') userId:number, @Body() dto: CreateMemberDuesPayment) {
        return this.memberDuesPaymentService.createMemberDuesPayment
        (userId, dto)
    }
    
    @Get()
    getMemberDuesPayment(@GetUser('id') userId:number) {
        return this.memberDuesPaymentService.getMemberDuesPayment(userId)
    }

    @Get(':id')
    getMemberDuesPaymentById(@GetUser('id') userId:number, @Param('id', ParseIntPipe) paymentId:number) {
        return this.memberDuesPaymentService.getMemberDuesPaymentById(userId, paymentId)
    }

    @Patch(':id')
    updateMemberDuesPaymentById(@GetUser('id') userId:number, @Param('id', ParseIntPipe) paymentId:number, @Body() dto: EditMemberDuesPayment) {
        return this.memberDuesPaymentService.updateMemberDuesPayment(userId, paymentId, dto)
    }

    @Delete(':id')
    removeMemberDuesPaymentById(@GetUser('id') userId:number, @Param('id', ParseIntPipe) paymentId:number) {
        return this.memberDuesPaymentService.removeMemberDuesPayment(userId, paymentId)
    }
}
