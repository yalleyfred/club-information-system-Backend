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
import { ExpenseTypeService } from './expense-type.service';
import { GetUser } from 'src/auth/decorator';
import { CreateItemTypeDto, EditItemTypeDto } from 'src/dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('expense-type')
export class ExpenseTypeController {
  constructor(private expenseTypeService: ExpenseTypeService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public createExpenseType(@GetUser('id') adminId: number, @Body() dto: CreateItemTypeDto) {
    return this.expenseTypeService.createExpenseType(adminId, dto);
  }

  @Get(':id')
  public getExpenseType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) expenseId: number
  ) {
    return this.expenseTypeService.getExpenseType(adminId, expenseId);
  }

  @Get()
  public getAllExpenseType(@GetUser('id') adminId: number) {
    return this.expenseTypeService.getAllExpenseType(adminId);
  }

  @Patch(':id')
  public editExpenseType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) expenseId: number,
    @Body() dto: EditItemTypeDto
  ) {
    return this.expenseTypeService.editExpenseType(adminId, expenseId, dto);
  }

  @Delete(':id')
  public removeExpenseType(
    @GetUser('id') adminId: number,
    @Param('id', ParseIntPipe) expenseId: number
  ) {
    return this.expenseTypeService.removeExpenseType(adminId, expenseId);
  }
}
