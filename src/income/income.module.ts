import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { IncomeDataAccessService } from './income-data-access.service';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService, IncomeDataAccessService],
})
export class IncomeModule {}
