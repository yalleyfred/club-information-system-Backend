import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ActiveMemberService } from './active-member.service';
import { GetUser } from 'src/auth/decorator';
import { CreateActiveMemberDto, EditActiveMemberDto } from './dto/active-member.dto';

@UseGuards(JwtGuard)
@Controller('active-member')
export class ActiveMemberController {
  constructor(private readonly activeMemberService: ActiveMemberService) {}

  @HttpCode(201)
  @Post()
  public createActiveMember(@GetUser('id') userId: number, @Body() dto: CreateActiveMemberDto) {
    return this.activeMemberService.createActiveMember(userId, dto);
  }

  @HttpCode(200)
  @Get()
  public getActiveMembers(@GetUser('id') userId: number) {
    return this.activeMemberService.getActiveMembers(userId);
  }

  @HttpCode(200)
  @Get(':id')
  public getActiveMemberById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) dropedId: number
  ) {
    return this.activeMemberService.getActiveMemberById(userId, dropedId);
  }

  @HttpCode(200)
  @Patch(':id')
  public updateActiveMember(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) dropedId: number,
    @Body() dto: EditActiveMemberDto
  ) {
    return this.activeMemberService.updateActiveMember(userId, dropedId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  public removeActiveMemberById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) dropedId: number
  ) {
    return this.activeMemberService.removeActiveMember(userId, dropedId);
  }
}
