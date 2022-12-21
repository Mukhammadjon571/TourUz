import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    alter table otp_logs drop column email;
  `);

  await knex.raw(`
    alter table otp_logs add column email varchar(64) not null;
  `)
}


export async function down(knex: Knex): Promise<void> {
}

