import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateToursMediaDto } from '../dto/create-tours-media.dto';
import { UpdateTourMediaDTO } from '../dto/update-tours-media.dto';

@Injectable()
export class ToursMediaRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get tableName() {
    return 'tours_media';
  }

  private get columnsList() {
    return [
      'id',
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'tour_id',
      'media_id',
      'is_active',
    ];
  }

  async create({ tourId, mediaId }: CreateToursMediaDto, created_by: number) {
    return (
      await this.knex(this.tableName)
        .insert({ tour_id: tourId, media_id: mediaId, created_by })
        .returning('*')
    )[0];
  }

  async findAll() {
    return this.knex(this.tableName).select(this.columnsList).where({
      is_active: true,
    });
  }

  async findOne(id: number) {
    return this.knex(this.tableName)
      .select(this.columnsList)
      .where({ id, is_active: true })
      .first();
  }

  async update(
    id: number,
    { tourId, mediaId }: UpdateTourMediaDTO,
    updated_by: number,
  ) {
    return (
      await this.knex(this.tableName)
        .update({
          tour_id: tourId,
          media_id: mediaId,
          updated_by,
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
