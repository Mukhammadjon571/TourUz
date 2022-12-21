import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { ToursRepo } from './repo/tours.repo';

@Module({
  providers: [ToursService,ToursRepo],
  controllers: [ToursController]
})
export class ToursModule {}
