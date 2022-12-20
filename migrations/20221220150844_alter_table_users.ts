import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table users add column avatar int  references files(id) on delete cascade
  `)
  await knex.raw(`
    alter table users add column avatar_json jsonb
  `)
}


export async function down(knex: Knex): Promise<void> {
}

