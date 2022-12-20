import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateOtpLogInternalDto } from '../dto/create-otp-log.dto';

@Injectable()
export class OtpLogsRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get tableName() {
    return 'otp_logs';
  }

  private get columns() {
    return [
      'id',
      'created_at',
      'created_by',
      'updated_at',
      'updated_by',
      'code',
      'email',
      'expiration_date',
      'expiration_period',
      'given_to',
      'is_active',
    ];
  }

  async create(data: CreateOtpLogInternalDto) {
    const {
      code,
      expiration_date,
      expiration_period,
      created_by,
      given_to,
      email,
    } = data;

    return (
      await this.knex(this.tableName)
        .insert({
          code,
          expiration_date,
          expiration_period,
          created_by,
          given_to,
          email,
        })
        .returning(this.columns)
    )[0];
  }

  inactivateOldestOtpLogsByUserIdOrEmail(userId: number, email: string) {
    return this.knex(this.tableName)
      .update({
        is_active: false,
      })
      .where('given_to', userId)
      .orWhere('email', email)
      .andWhere('is_active', true);
  }

  findLatestOtpLogByEmail(email: string) {
    return this.knex(this.tableName)
      .select(this.columns)
      .where('email', email)
      .andWhere('is_active', true)
      .orderBy('id', 'desc')
      .first();
  }

  inactivateOtpLogById(id: number) {
    return this.knex(this.tableName)
      .update({
        is_active: false,
      })
      .where('id', id);
  }

  inactivateOtpLogByUserId(userId: number) {
    return this.knex(this.tableName)
      .update({
        is_active: false,
      })
      .where('given_to', userId);
  }
}
