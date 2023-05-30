import { Module } from '@nestjs/common';
import { IncomeTypeController } from './income-type.controller';
import { IncomeTypeService } from './income-type.service';

@Module({
  controllers: [IncomeTypeController],
  providers: [IncomeTypeService]
})
export class IncomeTypeModule {}
