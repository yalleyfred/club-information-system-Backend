import { Module } from '@nestjs/common';
import { DuesController } from './dues.controller';
import { DuesService } from './dues.service';
import { DuesDataAccessService } from './dues-data-access.service';

@Module({
  controllers: [DuesController],
  providers: [DuesService, DuesDataAccessService],
})
export class DuesModule {}
