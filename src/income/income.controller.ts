import {
  Controller,
  UseGuards,
  Patch,
  Body,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateIncomeDto, EditIncomeDto } from 'src/dto';

@UseGuards(JwtGuard)
@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  public createIncome(@GetUser('id') userId: number, @Body() dto: CreateIncomeDto) {
    return this.incomeService.createIncome(userId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public getIncomeById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) incomeId: number) {
    return this.incomeService.getIncomeById(userId, incomeId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public getAllIncome(@GetUser('id') userId: number) {
    return this.incomeService.getAllIncome(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public editIncome(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) incomeId: number,
    @Body() dto: EditIncomeDto
  ) {
    return this.incomeService.editIncome(userId, incomeId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public removeIncome(@GetUser('id') userId: number, @Param('id', ParseIntPipe) incomeId: number) {
    return this.incomeService.removeIncome(userId, incomeId);
  }
}
