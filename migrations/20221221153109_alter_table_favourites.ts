import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table favourites add column created_by int references users(id) on delete cascade;
  `);
}

export async function down(knex: Knex): Promise<void> {}
