import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create type difficulty_type as enum('easy','medium','hard');
  `);
  await knex.raw(`
    create table tours(
      id serial primary key,
      created_at timestamp not null default current_timestamp,
      created_by int references users(id) on delete cascade,
      updated_at timestamp,
      updated_by int references users(id) on delete cascade,
      name  varchar(128) not null,
      price float not null,
      longitude varchar(16) not null,
      latitude varchar(16) not null,
      phone_number varchar(24),
      email varchar(64) not null,
      short_description varchar(64) not null,
      long_description text not null,
      days int not null,
      people int not null,
      difficulty difficulty_type default 'easy',
      is_active boolean not null default true
    );
  `);
}

export async function down(knex: Knex): Promise<void> {}
