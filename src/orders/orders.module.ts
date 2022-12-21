import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepo } from './repo/orders.repo';

@Module({
  providers: [OrdersService, OrdersRepo],
  controllers: [OrdersController],
})
export class OrdersModule {}
