import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MailService } from 'src/mail/mail.service';
import { AccountDataAccessService } from './account-data-access.service';
import { MemberDuesPaymentDataAccessService } from 'src/member-dues-payment/member-dues-payment-data-access.service';
import { DuesDataAccessService } from 'src/dues/dues-data-access.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, MailService, AccountDataAccessService],
})
export class AccountModule {}
