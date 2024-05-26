import { Module } from '@nestjs/common';
import { DropedMemberController } from './droped-member.controller';
import { DropedMemberService } from './droped-member.service';
import { DropedMemberDataAcessService } from './droped-member-data-access.service';

@Module({
  controllers: [DropedMemberController],
  providers: [DropedMemberService, DropedMemberDataAcessService],
})
export class DropedMemberModule {}
