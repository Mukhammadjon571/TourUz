import { Knex } from 'knex';
import { OrderStatusEnum } from '../src/orders/enums/orderStatus.enum';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table orders drop column payment_type_id;
  `);
  await knex.raw(`
  create type order_status as enum('${OrderStatusEnum.CREATED}', '${OrderStatusEnum.COMPLETED}', '${OrderStatusEnum.CANCELLED}')
`);

await knex.raw(`
  alter table orders add column status order_status not null default '${OrderStatusEnum.CREATED}';
`);
}

export async function down(knex: Knex): Promise<void> {}
