import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateFavouritesDTO } from '../dto/favourites.dto';
import { UpdateFavouritesDTO } from '../dto/update-favourites.dto';

export class FavouritesRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get tableName() {
    return 'favourites';
  }

  private get columnsList() {
    return ['id', 'created_at', 'created_by', 'tour_id', 'is_active'];
  }

  async create({ tour_id }: CreateFavouritesDTO, createdBy: number) {
    return (
      await this.knex(this.tableName)
        .insert({ tour_id, created_by: createdBy })
        .returning('*')
    )[0];
  }

  async findAll() {
    return this.knex(this.tableName)
      .select(this.columnsList)
      .where({ is_active: true });
  }

  async findOne(id: number) {
    return this.knex(this.tableName)
      .select(this.columnsList)
      .where({ id, is_active: true })
      .first();
  }

  async update(
    id: number,
    { tour_id }: UpdateFavouritesDTO,
    updatedBy: number,
  ) {
    return (
      await this.knex(this.tableName)
        .update({
          tour_id,
        })
        .where({ id })
        .returning('*')
    )[0];
  }

  async remove(id: number) {
    return (
      await this.knex(this.tableName)
        .update({ is_active: false })
        .where({ id })
        .returning('*')
    )[0];
  }
}
