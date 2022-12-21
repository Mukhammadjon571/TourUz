import { MailerService } from '@nestjs-modules/mailer';
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

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpLogsService: OtpLogsService,
    private readonly mailService: MailerService,
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

    await new Email(user,otp.code).sendCode();





    return 'The one time password has been sent';
  }
}
