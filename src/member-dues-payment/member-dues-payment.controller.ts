import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MemberDuesPaymentService } from './member-dues-payment.service';
import { GetUser } from 'src/auth/decorator';
import {
  CreateMemberDuesPayment,
  EditMemberDuesPayment,
  GetPaymentQuery,
} from './dto/member-dues-payment.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('member-dues-payment')
export class MemberDuesPaymentController {
  constructor(private readonly memberDuesPaymentService: MemberDuesPaymentService) {}

  @Post()
  public createMemberDuesPayment(
    @GetUser('id') userId: number,
    @Body() dto: CreateMemberDuesPayment
  ) {
    return this.memberDuesPaymentService.createMemberDuesPayment(userId, dto);
  }

  @Get('year')
  public getAllMemberDuesPaymentPerYear(
    @GetUser('id') userId: number,
    @Param('year', ParseIntPipe) year: string
  ) {
    return this.memberDuesPaymentService.getAllMemberDuesPaymentPerYear(userId, year);
  }

  @Get(':id')
  public getMemberDuesPaymentByMemberId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) memberId: number,
    @Query('year') year: string
  ) {
    return this.memberDuesPaymentService.getMemberDuesPaymentByMemberId(userId, memberId, year);
  }

  @Patch(':id')
  public updateMemberDuesPaymentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
    @Body() dto: EditMemberDuesPayment,
    @Query() query: GetPaymentQuery
  ) {
    return this.memberDuesPaymentService.updateMemberDuesPayment(
      userId,
      query.memberId,
      paymentId,
      query.year,
      dto
    );
  }

  @Delete(':id')
  public removeMemberDuesPaymentById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) paymentId: number,
    @Query() query: GetPaymentQuery
  ) {
    return this.memberDuesPaymentService.removeMemberDuesPayment(
      userId,
      paymentId,
      query.memberId,
      query.year
    );
  }
}
