import {
  Controller,
  Body,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { EditMemberDto, createMemberDto } from 'src/member/dto/member.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createMember(@Body() dto: createMemberDto, @GetUser('id') userId: number) {
    return this.memberService.createMember(dto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  getMembers(@GetUser('id') userId: number) {
    return this.memberService.getMembers(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getMember(@GetUser('id') userId: number, @Param('id', ParseIntPipe) memberId: number) {
    return this.memberService.getMember(userId, memberId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  editMember(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) memberId: number,
    @Body() dto: EditMemberDto,
  ) {
    return this.memberService.editMember(userId, memberId, dto);
  }

  @Delete(':id')
  dropMemeber(@GetUser('id') userId: number, @Param('id', ParseIntPipe) memberId: number) {
    return this.memberService.dropMember(userId, memberId);
  }
}
