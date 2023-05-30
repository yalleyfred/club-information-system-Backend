import { Module } from '@nestjs/common';
import { MemberDuesPaymentController } from './member-dues-payment.controller';
import { MemberDuesPaymentService } from './member-dues-payment.service';

@Module({
  controllers: [MemberDuesPaymentController],
  providers: [MemberDuesPaymentService]
})
export class MemberDuesPaymentModule {}
