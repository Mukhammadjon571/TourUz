import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    create table tours_media (
      id serial primary key,
      created_at timestamp not null default current_timestamp,
      created_by int references users(id) on delete cascade,
      updated_at timestamp,
      updated_by int references users(id) on delete cascade,
      tour_id int not null references tours(id),
      media_id int not null references files(id)
    );
  `)
}


export async function down(knex: Knex): Promise<void> {
}

