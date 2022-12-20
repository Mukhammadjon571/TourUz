import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import config from 'src/config';
import { CreateAccessTokenDto } from './dto/create-access-token.dto';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { SaveTokenDto } from './dto/save-token.dto';
import { TokensRepo } from './repo/token.repo';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokensRepo: TokensRepo,
  ) {}

  createAccessToken(data: CreateAccessTokenDto) {
    return this.jwtService.signAsync(data, {
      secret: config.authToken.accessTokenSecret,
      expiresIn: config.authToken.accessTokenExpiresIn,
    });
  }

  createRefreshToken(data: CreateRefreshTokenDto) {
    return this.jwtService.signAsync(data, {
      secret: config.authToken.refreshTokenSecret,
      expiresIn: config.authToken.refreshTokenExpiresIn,
    });
  }

  verifyAccessToken(token: string) {
    return this.jwtService.verify(token, {
      secret: config.authToken.accessTokenSecret,
    });
  }

  verifyRefreshToken(token: string) {
    return this.jwtService.verify(token, {
      secret: config.authToken.refreshTokenSecret,
    });
  }

  async createToken(data: SaveTokenDto) {
    const { accessTokenExpiresIn, refreshTokenExpiresIn } = config.authToken;

    data['accessTokenExpirationDate'] =
      this.tokenExpiresInToDate(accessTokenExpiresIn);

    data['refreshTokenExpirationDate'] = this.tokenExpiresInToDate(
      refreshTokenExpiresIn,
    );

    const existsToken = await this.tokensRepo.getByUserId(data.userId);

    if (existsToken) {
      this.tokensRepo.updateToken(existsToken.id);
    }

    return this.tokensRepo.createToken(data);
  }

  private tokenExpiresInToDate(expiresIn: string) {
    const unitMapper = {
      ms: 'milliseconds',
      s: 'seconds',
      m: 'minutes',
      h: 'hours',
      d: 'days',
      y: 'years',
    };

    const unit: string = expiresIn.split(/[0123456789]/).join('');
    const duration: number = +expiresIn.slice(0, expiresIn.indexOf(unit[0]));

    return dayjs(new Date()).add(duration, unitMapper[unit]);
  }

  getUserById(userId: number) {
    return this.tokensRepo.getByUserId(userId);
  }
  getByAccessToken(accessToken: string) {
    return this.tokensRepo.getByAccessToken(accessToken);
  }

  updateToken(id: number) {
    return this.tokensRepo.updateToken(id);
  }

  async decodeAccessToken(accessToken: string) {
    return await this.jwtService.verifyAsync(accessToken, {
      secret: config.authToken.accessTokenSecret,
    });
  }

  async decodeRefreshToken(refreshToken: string) {
    return await this.jwtService.verifyAsync(refreshToken, {
      secret: config.authToken.refreshTokenSecret,
    });
  }
}
