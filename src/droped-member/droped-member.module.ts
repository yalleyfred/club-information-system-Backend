import { Module } from '@nestjs/common';
import { DropedMemberController } from './droped-member.controller';
import { DropedMemberService } from './droped-member.service';

@Module({
  controllers: [DropedMemberController],
  providers: [DropedMemberService]
})
export class DropedMemberModule {}
