import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table messages (
      id serial primary key,
      create_at timestamp not null default current_timestamp,
      text varchar(1024), 
      sender_name varchar(128),
      receiver_name varchar(128),
      is_active boolean not null default true);
  `);
}

export async function down(knex: Knex): Promise<void> {}
