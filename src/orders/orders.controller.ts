import { Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Body } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/users/interface/user.interface';
import { UpdateOrderDTO } from './dto/update-order.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post()
  create(@Body() data: CreateOrderDTO, @User() user: IUser) {
    return this.service.create(data, user.id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateOrderDTO,
    @User() user: IUser,
  ) {
    return this.service.update(id, data, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @User() user: IUser) {
    return this.service.delete(id, user.id);
  }
}
