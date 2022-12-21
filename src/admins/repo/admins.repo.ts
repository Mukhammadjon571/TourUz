import { CreateAdminDto } from '../dto/create-admin.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

export class AdminsRepo {
  private readonly tableName = 'admins';

  constructor(@InjectConnection() private readonly knex: Knex) {}

  async create({ userId }: CreateAdminDto) {
    return (
      await this.knex(this.tableName)
        .insert({
          admin_id: userId,
          created_by: userId, // change this statement after implement auth
        })
        .returning('*')
    )[0];
  }

  findAll() {
    return this.knex({ a: this.tableName })
      .select(
        'a.id',
        'a.is_active',
        'a.created_at',
        'a.updated_at',
        this.knex.raw(`
          json_build_object(
            'id', u.id,
            'first_name', u.first_name,
            'last_name', u.last_name,
            'username',u.username,
            'phone_number',u.phone_number,
            'email',u.email,
            'is_verified',u.is_verified,
            'is_active',u.is_active,
            'created_at',u.created_at,
            'updated_at',u.updated_at
          ) as user
        `),
      )
      .join({ u: 'users' }, 'a.admin_id', '=', 'u.id');
  }

  findOne(id: number) {
    return this.knex({ a: this.tableName })
      .select(
        'a.id',
        'a.is_active',
        'a.created_at',
        'a.updated_at',
        this.knex.raw(`
        json_build_object(
          'id', u.id,
          'first_name', u.first_name,
          'last_name', u.last_name,
          'username',u.username,
          'phone_number',u.phone_number,
          'email',u.email,
          'is_verified',u.is_verified,
          'is_active',u.is_active,
          'created_at',u.created_at,
          'updated_at',u.updated_at
        ) as user
      `),
      )
      .join({ u: 'users' }, 'a.admin_id', '=', 'u.id')
      .where('a.id', id)
      .first();
  }

  async update(id: number, { userId }: UpdateAdminDto) {
    return (
      await this.knex({ a: this.tableName })
        .update({ admin_id: userId })
        .where('a.id', id)
        .returning('*')
    )[0];
  }

  async remove(id: number) {
    return (
      await this.knex({ a: this.tableName })
        .update({ is_active: false })
        .where('a.id', id)
        .returning('*')
    )[0];
  }

  async findByAdminId(adminId: number) {
    return await this.knex(this.tableName)
      .select('*')
      .where({ is_active: true, admin_id: adminId })
      .first();
  }
}
