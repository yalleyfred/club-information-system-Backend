import {
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  HttpCode,
  Body,
  Delete,
} from '@nestjs/common';
import { DropedMemberService } from './droped-member.service';
import { GetUser } from 'src/auth/decorator';
import { CreateDropedMemberDto, EditDropedMemberDto } from './dto/droped-member.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('droped-member')
export class DropedMemberController {
  constructor(private readonly dropedMemberService: DropedMemberService) {}

  @HttpCode(201)
  @Post()
  public createDropedMember(@GetUser('id') userId: number, @Body() dto: CreateDropedMemberDto) {
    return this.dropedMemberService.createDropedMember(userId, dto);
  }

  @HttpCode(200)
  @Get()
  public getDropedMembers(@GetUser('id') userId: number) {
    return this.dropedMemberService.getDropedMembers(userId);
  }

  @HttpCode(200)
  @Get(':id')
  public getDropedMemberById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) dropedId: number
  ) {
    return this.dropedMemberService.getDropedMemberById(userId, dropedId);
  }

  @HttpCode(200)
  @Patch(':id')
  public updateDropedMember(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) dropedId: number,
    @Body() dto: EditDropedMemberDto
  ) {
    return this.dropedMemberService.updateDropedMember(userId, dropedId, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  public removeDropedMemberById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) dropedId: number
  ) {
    return this.dropedMemberService.removeDropedMember(userId, dropedId);
  }
}
