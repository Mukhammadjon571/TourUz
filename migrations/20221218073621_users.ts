import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table users( 
      id serial primary key,
      created_at timestamp not null default current_timestamp,
      created_by int references users(id) on delete cascade,
      updated_at timestamp,
      updated_by int references users(id) on delete cascade,
      full_name varchar(64) not null, 
      username varchar(32),
      phone_number varchar(24),
      password varchar(256) not null,
      email varchar(320) not null,
      is_verified boolean not null default false,
      is_active boolean not null default true
    );
  `);
}

export async function down(knex: Knex): Promise<void> {}
