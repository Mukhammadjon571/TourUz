import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table files add column if not exists size int not null default 0;
  `);

  await knex.raw(`
    alter table files add column filename varchar(256) not null;
  `);
}

export async function down(knex: Knex): Promise<void> {}
