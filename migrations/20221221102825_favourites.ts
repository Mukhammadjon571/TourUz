import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.raw(`create table favourites(
    id serial primary key,
    created_at timestamp not null default current_timestamp,
    tour_id int not null references tours(id),
    is_active boolean not null default true
  )`)
}


export async function down(knex: Knex): Promise<void> {
}

