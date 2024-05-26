import { Module } from '@nestjs/common';
import { ExpenseTypeController } from './expense-type.controller';
import { ExpenseTypeService } from './expense-type.service';
import { ExpenseTypeAccessService } from './expense-type-data-access.service';

@Module({
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService, ExpenseTypeAccessService],
})
export class ExpenseTypeModule {}
