import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import dayjs from 'dayjs';
import { IUser } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IToken,
} from '../token/interfaces/token.interfaces';
import { TokenService } from '../token/token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class RefreshTokenService {
  @Inject() private readonly tokenService: TokenService;
  @Inject() private readonly usersService: UsersService;

  public async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const token: IToken = await this.tokenService.getByAccessToken(
      refreshTokenDto.access_token,
    );

    if (
      !token.is_active ||
      token.refresh_token !== refreshTokenDto.refresh_token
    ) {
      throw new UnauthorizedException();
    }

    if (
      token.refresh_token_expiration_date <= new Date() &&
      token.refresh_token_expiration_date <= new Date()
    ) {
      throw new UnauthorizedException();
    }

    const refreshTokenPayload: IRefreshTokenPayload =
      await this.tokenService.decodeRefreshToken(token.refresh_token);

    if (token.given_to !== refreshTokenPayload.user_id) {
      throw new UnauthorizedException();
    } else if (token.access_token_expiration_date <= new Date()) {
      await this.tokenService.updateToken(token.id);

      const userData: IUser = await this.usersService.findOne(token.given_to);

      const newAccessToken: string = await this.tokenService.createAccessToken({
        id: userData.id,
        full_name: userData.full_name,
        username: userData.username,
        email: userData.email,
      });

      const newRefreshToken: string =
        await this.tokenService.createRefreshToken({
          user_id: token.given_to,
        });

      const newToken = await this.tokenService.createToken({
        userId: token.given_to,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });

      return {
        access_token: newToken.access_token,
        refresh_token: newToken.refresh_token,
      };
    }
  }
}
