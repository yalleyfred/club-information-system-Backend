import { Module } from '@nestjs/common';
import { MemberDuesPaymentController } from './member-dues-payment.controller';
import { MemberDuesPaymentService } from './member-dues-payment.service';
import { MemberDuesPaymentDataAccessService } from './member-dues-payment-data-access.service';

@Module({
  controllers: [MemberDuesPaymentController],
  providers: [MemberDuesPaymentService, MemberDuesPaymentDataAccessService],
})
export class MemberDuesPaymentModule {}
