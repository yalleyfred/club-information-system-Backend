import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MemberModule } from './member/member.module';
// import { DuesModule } from './dues/dues.module';
// import { AllDuesModule } from './all-dues/all-dues.module';
import { MailModule } from './mail/mail.module';
// import { AdminAccountModule } from './admin-account/admin-account.module';
// import { PublicAccountModule } from './public-account/public-account.module';
import { DuesTypeModule } from './types module/dues-type/dues-type.module';
import { IncomeTypeModule } from './types module/income-type/income-type.module';
import { ExpenseTypeModule } from './types module/expense-type/expense-type.module';
import { IncomeModule } from './income/income.module';
import { ExpenseModule } from './expense/expense.module';
import { DuesModule } from './dues/dues.module';
import { MemberDuesPaymentModule } from './member-dues-payment/member-dues-payment.module';
import { DropedMemberModule } from './droped-member/droped-member.module';
import { ActiveMemberModule } from './active-member/active-member.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    MemberModule,

    MailModule,

    DuesTypeModule,

    IncomeTypeModule,

    ExpenseTypeModule,

    IncomeModule,

    ExpenseModule,

    DuesModule,

    MemberDuesPaymentModule,

    DropedMemberModule,

    ActiveMemberModule,

    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
