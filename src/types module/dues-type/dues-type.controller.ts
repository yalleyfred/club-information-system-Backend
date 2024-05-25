import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpCode,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { DuesTypeService } from './dues-type.service';
import { GetUser } from 'src/auth/decorator';
import { CreateTypeDto, EditTypeDto } from 'src/types module/dto/type.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('dues-type')
export class DuesTypeController {
  constructor(private duesTypeService: DuesTypeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public createDuesType(
    @GetUser('id') adminId: number,
    @Body() dto: CreateTypeDto,
    @GetUser() user: object
  ) {
    return this.duesTypeService.createDuesType(adminId, dto);
  }

  @Get(':id')
  public getDues(@GetUser('id') adminId: number, @Param('id', ParseIntPipe) duesId: number) {
    return this.duesTypeService.getDuesType(adminId, duesId);
  }

  @Get()
  public getAllDues(@GetUser('id') adminId: number) {
    return this.duesTypeService.getDues(adminId);
  }

  @Patch(':id')
  public editDuesType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) duesId: number,
    @Body() dto: EditTypeDto
  ) {
    return this.duesTypeService.editDuesType(adminId, duesId, dto);
  }

  @Delete(':id')
  public removeDuesType(@GetUser('id') adminId: number, @Param('id', ParseIntPipe) duesId: number) {
    return this.duesTypeService.removeDuesType(adminId, duesId);
  }
}
