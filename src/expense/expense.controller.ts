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
import { ExpenseService } from './expense.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { CreateExpenseDto, EditExpenseDto } from './dto/expense.dto';

@UseGuards(JwtGuard)
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  public createExpense(@GetUser('id') userId: number, @Body() dto: CreateExpenseDto) {
    return this.expenseService.createExpense(userId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public getExpenseById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) expenseId: number
  ) {
    return this.expenseService.getExpenseById(userId, expenseId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public getAllExpense(@GetUser('id') userId: number) {
    return this.expenseService.getAllExpense(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public editExpense(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) expenseId: number,
    @Body() dto: EditExpenseDto
  ) {
    return this.expenseService.editExpense(userId, expenseId, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public removeExpense(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) expenseId: number
  ) {
    return this.expenseService.removeExpense(userId, expenseId);
  }
}
