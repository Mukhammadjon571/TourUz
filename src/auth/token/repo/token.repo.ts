import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { SaveTokenDto } from '../dto/save-token.dto';

export class TokensRepo {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  private get tableName() {
    return 'tokens';
  }

  async createToken(saveTokenDto: SaveTokenDto) {
    return (
      await this.knex(this.tableName)
        .insert({
          access_token: saveTokenDto.accessToken,
          refresh_token: saveTokenDto.refreshToken,
          access_token_expiration_date:
            saveTokenDto['accessTokenExpirationDate'],
          refresh_token_expiration_date:
            saveTokenDto['refreshTokenExpirationDate'],
          given_to: saveTokenDto.userId,
        })
        .returning('*')
    )[0];
  }

  async getByUserId(userId: number) {
    return await this.knex(this.tableName)
      .select('*')
      .where({ given_to: userId, is_active: true })
      .first();
  }

  async updateToken(id: number) {
    return await this.knex(this.tableName)
      .update({ is_active: false })
      .where({ id });
  }

  async getByAccessToken(accessToken: string) {
    return await this.knex(this.tableName)
      .select(
        'id',
        'issued_date',
        'access_token',
        'refresh_token',
        'access_token_expiration_date',
        'refresh_token_expiration_date',
        'given_to',
        'is_active',
      )
      .where({ access_token: accessToken })
      .first();
  }
}
