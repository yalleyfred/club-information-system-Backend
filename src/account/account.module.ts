import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, MailService]
})
export class AccountModule {}
