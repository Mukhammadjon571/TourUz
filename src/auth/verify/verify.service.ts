import {
  GoneException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import { IOtpLog } from '../otp-logs/interface/otp-log.interfaces';
import { OtpLogsService } from '../otp-logs/otp-logs.service';
import { TokenService } from '../token/token.service';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class VerifyService {
  constructor(
    private readonly otpLogsService: OtpLogsService,
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async verify(data: VerifyDto) {
    const otpLog: IOtpLog =
      await this.otpLogsService.findLatestOtpLogByEmail(
        data.email,
      );

    if (!otpLog) {
      throw new NotFoundException();
    } else if (new Date() >= otpLog.expiration_date) {
      await this.otpLogsService.inactivateOtpLogById(otpLog.id);
      throw new GoneException();
    } else if (+otpLog.code !== data.code) {
      throw new UnauthorizedException();
    }

    const user: IUser = await this.usersService.findOne(otpLog.given_to);

    await this.otpLogsService.inactivateOtpLogByUserId(user.id);

    if (!user.is_verified) {
      await this.usersService.verifyById(user.id);
    }

    const accessToken: string = await this.tokenService.createAccessToken({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
    });

    const refreshToken: string = await this.tokenService.createRefreshToken({
      user_id: user.id,
    });

    this.tokenService.createToken({
      accessToken,
      refreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
