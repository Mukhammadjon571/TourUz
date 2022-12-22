
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import { compareHash } from 'src/utils/bcrypt';
import { IOtpLog } from '../otp-logs/interface/otp-log.interfaces';
import { OtpLogsService } from '../otp-logs/otp-logs.service';
import { LoginDto } from './dto/login.dto';
import { Email } from 'src/utils/email';
import { TokenService } from '../token/token.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpLogsService: OtpLogsService,
    private readonly tokenService: TokenService,
  ) {}

  async login(data: LoginDto) {
    const user: IUser = await this.usersService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException();
    } else if (!(await compareHash(data.password, user.password))) {
      throw new UnauthorizedException();
    }

    const otp: IOtpLog = await this.otpLogsService.create({
      created_by: user.id,
      given_to: user.id,
      email: user.email,
    });

    await new Email(user).sendCode(otp.code);
    return 'The one time password has been sent';
  }

  async loginAdmin(data: LoginDto) {

    const user: IUser = await this.usersService.findByEmail(data.email);



    if (!user) {
      throw new NotFoundException();
    } else if (!(await compareHash(data.password, user.password))) {
      throw new UnauthorizedException();
    }

    if (!user.is_admin) {
      throw new UnauthorizedException();
    }

    const tokenData = await this.tokenService.getUserById(user.id);

    return tokenData;
  }
}
