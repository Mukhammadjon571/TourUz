import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table tours_media add column is_active boolean not null default true;
  `);
}

export async function down(knex: Knex): Promise<void> {}
