import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table users add column is_admin boolean default false;
  `)
}


export async function down(knex: Knex): Promise<void> {
}

