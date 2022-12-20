import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import config from 'src/config';

@Injectable()
export class FilesRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  upload(
    files: {
      original_name: string;
      filename: string;
      mimetype: string;
      extension: string;
      created_by: string;
      size: number;
    }[],
  ) {
    return this.knex.insert(files).into('files').returning('*');
  }

  async findManyByIds(ids: number[]) {
    return this.knex('files')
      .select('id')
      .whereIn('id', ids)
      .andWhere({ is_active: true });
  }
}
