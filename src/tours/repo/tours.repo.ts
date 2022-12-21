import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { CreateTourDTO } from '../dto/create-tour.dto';
import { UpdateTourDTO } from '../dto/update-tour.dto';

@Injectable()
export class ToursRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get tableName() {
    return 'tours';
  }

  private get columnsList() {
    return [
      'id',
      'name',
      'price',
      'langitude',
      'latitude',
      'phone_number',
      'email',
      'short_description',
      'long_description',
      'difficulty',
      'days',
      'people',
      'created_by',
      'updated_by',
      'created_at',
      'updated_at',
    ];
  }

  async create(
    {
      name,
      price,
      langitude,
      latitude,
      phone_number,
      email,
      short_description,
      long_description,
      difficulty,
      days,
      people,
    }: CreateTourDTO,
    created_by: number,
  ) {
    return (
      await this.knex(this.tableName)
        .insert({
          name,
          price,
          langitude,
          latitude,
          phone_number,
          email,
          short_description,
          long_description,
          difficulty,
          days,
          people,
          created_by,
        })
        .returning('*')
    )[0];
  }

  async findAll() {
    return await this.knex(this.tableName)
      .select(this.columnsList)
      .where({ is_active: true });
  }

  async findOne(id: number) {
    return (
      await this.knex(this.tableName)
        .select(this.columnsList)
        .where({ id, is_active: true })
    )[0];
  }

  async update(
    id: number,
    {
      name,
      price,
      langitude,
      latitude,
      phone_number,
      email,
      short_description,
      long_description,
      difficulty,
      days,
      people,
    }: UpdateTourDTO,
    updated_by: number,
  ) {
    return (
      await this.knex(this.tableName)
        .update({
          name,
          price,
          langitude,
          latitude,
          phone_number,
          email,
          short_description,
          long_description,
          difficulty,
          days,
          people,
          updated_by,
        })
        .where({ id, is_active: true })
        .returning('*')
    )[0];
  }

  async remove(id: number, updated_by: number) {
    return (
      await this.knex(this.tableName)
        .update({ is_active: false, updated_by })
        .where({ id, is_active: true })
        .returning('*')
    )[0];
  }
}
