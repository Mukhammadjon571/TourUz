import { Injectable } from '@nestjs/common';
import { OrdersRepo } from './repo/orders.repo';
import { CreateOrderDTO } from './dto/create-order.dto';
import { UpdateOrderDTO } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrdersRepo) {}

  async create(data: CreateOrderDTO, created_by: number) {
    return await this.repo.create(data, created_by);
  }

  async update(id: number, data: UpdateOrderDTO, updated_by: number) {
    return await this.repo.update(id, data, updated_by);
  }

  async delete(id: number, updated_by: number) {
    return await this.repo.remove(id, updated_by);
  }

  async findAll() {
    return await this.repo.findAll();
  }

  async findOne(id: number) {
    return await this.repo.findOne(id);
  }
}
