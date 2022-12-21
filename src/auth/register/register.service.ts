import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { IUser } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import { generateHash } from 'src/utils/bcrypt';
import { IOtpLog } from '../otp-logs/interface/otp-log.interfaces';
import { OtpLogsService } from '../otp-logs/otp-logs.service';
import { RegisterDto } from './dto/register.dto';
import { Email } from 'src/utils/email';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpLogsService: OtpLogsService,
    private readonly mailService: MailerService,
  ) {}

  async register(data: RegisterDto) {
    const foundUserByEmail: IUser = await this.usersService.findByEmail(
      data.email,
    );

    if (foundUserByEmail) {
      throw new ConflictException(`${data.email} has already used`);
    } else if (!this.usersService.isEmptyUsername(data.username)) {
      throw new ConflictException(`${data.username} has already taken`);
    }

    const user: IUser = await this.usersService.create({
      email: data.email,
      is_verified: false,
      full_name: data.full_name,
      password: await generateHash(data.password),
      phone_number: data.phone_number,
      username: data.username,
      avatar: null,
      avatar_json: null,
    });

    const otp: IOtpLog = await this.otpLogsService.create({
      created_by: user.id,
      given_to: user.id,
      email: user.email,
    });

    await new Email(user).sendCode(otp.code);

    return 'The one time password has been sent';
  }
}
