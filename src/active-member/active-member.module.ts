import { Module } from '@nestjs/common';
import { ActiveMemberService } from './active-member.service';
import { ActiveMemberController } from './active-member.controller';

@Module({
  providers: [ActiveMemberService],
  controllers: [ActiveMemberController],
})
export class ActiveMemberModule {}
