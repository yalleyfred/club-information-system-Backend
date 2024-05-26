import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseDataAccessService } from './expense-data-access.service';

@Module({
  providers: [ExpenseService, ExpenseDataAccessService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
