import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        create table tokens(
            id serial primary key,
            issued_date timestamp not null default current_timestamp,
            access_token varchar(1024),
            refresh_token varchar(1024),
            access_token_expiration_date varchar,
            refresh_token_expiration_date varchar,
            given_to int references users(id),
            is_active boolean not null default true
        );
    `);
}

export async function down(knex: Knex): Promise<void> {}
