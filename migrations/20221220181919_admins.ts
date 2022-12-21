import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table admins(
      id serial primary key,
      created_at timestamp not null default current_timestamp,
      created_by int not null references users(id) on delete cascade,
      updated_at timestamp,
      updated_by int references users(id) on delete cascade,
      admin_id int not null references users(id) on delete cascade,
      is_active boolean not null default true
    );
  `);
}

export async function down(): Promise<void> {
  // operate something here
}
