import { InjectConnection } from 'nest-knexjs';
import { CreateOrderDTO } from '../dto/create-order.dto';
import { Knex } from 'knex';
import { UpdateOrderDTO } from '../dto/update-order.dto';

export class OrdersRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get tableName() {
    return 'orders';
  }

  private get columnsList() {
    return [
      'id',
      'tour_id',
      'customer_id',
      'created_by',
      'created_at',
      'status',
      'overall_price',
      'customized_price',
      'discount',
      'is_active',
    ];
  }

  async create(
    {
      tour_id,
      customer_id,
      status,
      overall_price,
      customized_price,
      discount,
    }: CreateOrderDTO,
    created_by: number,
  ) {
    return (
      await this.knex(this.tableName)
        .insert({
          tour_id,
          customer_id,
          created_by,
          status,
          overall_price,
          customized_price,
          discount,
        })
        .returning(this.columnsList)
    )[0];
  }

  async update(id: number, data: UpdateOrderDTO, updated_by: number) {
    return (
      await this.knex(this.tableName)
        .where({ id })
        .update({
          ...data,
          updated_by,
        })
        .returning(this.columnsList)
    )[0];
  }

  async remove(id: number, updated_by: number) {
    return (
      await this.knex(this.tableName)
        .where({ id })
        .update({
          is_active: false,
          updated_by,
        })
        .returning(this.columnsList)
    )[0];
  }

  async findAll() {
    return await this.knex(this.tableName)
      .select(this.columnsList)
      .where({ is_active: true });
  }

  async findOne(id: number) {
    return (
      await this.knex(this.tableName).where({ id }).select(this.columnsList)
    )[0];
  }
}
