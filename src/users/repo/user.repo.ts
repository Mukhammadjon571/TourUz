import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto';

@Injectable()
export class UsersRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get columns() {
    return [
      'id',
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'full_name',
      'username',
      'phone_number',
      'email',
      'avatar',
      'avatar_json',
      'is_verified',
      'is_active',
    ];
  }

  private get tableName() {
    return 'users';
  }

  async create(data: CreateUserDto) {
    return (
      await this.knex(this.tableName)
        .insert({
          full_name: data.full_name,
          username: data.username,
          password: data.password,
          phone_number: data.phone_number,
          email: data.email,
          is_verified: data.is_verified,
        })
        .returning(this.columns)
    )[0];
  }

  findOne(id: number) {
    return this.knex({ u: this.tableName })
      .select(
        ...this.columns.map((column) => `u.${column}`),
        
      )
      .where('u.id', id)
      .first();
  }
  findByEmail(email: string) {
    return this.knex(this.tableName)
      .select([...this.columns, 'password'])
      .where('email', email)
      .andWhere('is_verified', true)
      .andWhere('is_active', true)
      .first();
  }

  findByAccessToken(accessToken: string) {
    return this.knex(`${this.tableName} as u`)
      .select('u.*')
      .join('tokens as t', 't.access_token', '=', accessToken)
      .where('t.given_to', 'u.id')
      .returning('*');
  }

  findByUsername(username: string) {
    return this.knex(this.tableName)
      .select(this.columns)
      .where('username', username)
      .andWhere('is_verified', true)
      .andWhere('is_active', true)
      .first();
  }

  verifyById(id: number) {
    return this.knex(this.tableName)
      .update({
        is_verified: true,
      })
      .where('id', id);
  }

  async updatePassword(id: number, password: string) {
    return await this.knex(this.tableName)
      .update({
        password,
      })
      .where('id', id)
      .returning('*');
  }

  getUserPassword(id: number) {
    return this.knex(this.tableName).select('password').where('id', id).first();
  }

  async updateById(
    id: number,
    {
      full_name,
      username,
      phone_number,
      email,
      avatar,
      avatar_json,
    }: UpdateUserDTO,
  ) {
    return (
      await this.knex(this.tableName)
        .update({
          full_name,
          username,
          phone_number,
          email,
          avatar,
          avatar_json,
        })
        .where({ id })
        .returning('*')
    )[0];
  }
}
