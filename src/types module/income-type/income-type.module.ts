import { Module } from '@nestjs/common';
import { IncomeTypeController } from './income-type.controller';
import { IncomeTypeService } from './income-type.service';
import { IncomeTypeAccessService } from './income-type-data-access.service';

@Module({
  controllers: [IncomeTypeController],
  providers: [IncomeTypeService, IncomeTypeAccessService],
})
export class IncomeTypeModule {}
