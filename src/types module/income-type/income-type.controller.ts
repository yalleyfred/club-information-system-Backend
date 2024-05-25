import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { IncomeTypeService } from './income-type.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateItemTypeDto, EditItemTypeDto } from 'src/dto';

@UseGuards(JwtGuard)
@Controller('income-type')
export class IncomeTypeController {
  constructor(private incomeTypeService: IncomeTypeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public createIncomeType(@GetUser('id') adminId: number, @Body() dto: CreateItemTypeDto) {
    return this.incomeTypeService.createIncomeType(adminId, dto);
  }

  @Get(':id')
  public getIncomeType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) incomeId: number
  ) {
    return this.incomeTypeService.getIncomeType(adminId, incomeId);
  }

  @Get()
  public getAllIncomeType(@GetUser('id') adminId: number) {
    return this.incomeTypeService.getAllIncomeType(adminId);
  }

  @Patch(':id')
  public editIncomeType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) incomeId: number,
    @Body() dto: EditItemTypeDto
  ) {
    return this.incomeTypeService.editIncomeType(adminId, incomeId, dto);
  }

  @Delete(':id')
  public removeIncomeType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) incomeId: number
  ) {
    return this.incomeTypeService.removeIncomeType(adminId, incomeId);
  }
}
