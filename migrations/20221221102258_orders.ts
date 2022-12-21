import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table if not exists order_payment_types(
      id serial primary key,
      created_at timestamp not null default current_timestamp,
      name varchar(128) not null,
      code varchar(128) not null,
      created_by int not null references users(id),
      is_active boolean not null default true
    );
  `)

  await knex.raw(`
    create table if not exists orders(
      id serial primary key,
      created_at timestamp not null default current_timestamp,
      created_by int not null references users(id),
      overall_price float not null,
      customized_price float not null,
      discount smallint not null default 0,
      payment_type_id int not null references order_payment_types(id),
      is_active boolean not null default true
    );
  `)
}


export async function down(knex: Knex): Promise<void> { }

