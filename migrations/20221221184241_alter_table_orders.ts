import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table orders add column tour_id int not null;
  `);

  await knex.raw(`
    alter table orders add column customer_id int not null references users(id);
  `);
}

export async function down(knex: Knex): Promise<void> {}
