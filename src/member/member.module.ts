import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MemberDataAccessService } from './member-data-access.service';

@Module({
  providers: [MemberService, MemberDataAccessService],
  controllers: [MemberController],
})
export class MemberModule {}
