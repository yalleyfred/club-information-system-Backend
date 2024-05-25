import { Module } from '@nestjs/common';
import { DuesTypeController } from './dues-type.controller';
import { DuesTypeService } from './dues-type.service';

@Module({
  controllers: [DuesTypeController],
  providers: [DuesTypeService],
})
export class DuesTypeModule {}
