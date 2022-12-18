import { ConflictException, Injectable } from '@nestjs/common';
import { SmsServiceService } from 'src/sms-service/sms-service.service';
import { IUser } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';
import { generateHash } from 'src/utils/bcrypt';
import { IOtpLog } from '../otp-logs/interface/otp-log.interface';
import { OtpLogsService } from '../otp-logs/otp-logs.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpLogsService: OtpLogsService,
  ) {}

  async register(data: RegisterDto) {
    const foundUserByPhoneNumber: IUser =
      await this.usersService.findByPhoneNumber(data.phone_number);

    if (foundUserByPhoneNumber) {
      throw new ConflictException(`${data.phone_number} has already used`);
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
      phone_number: user.phone_number,
    });

    console.log(otp);

    // const smsContent: string = `Confirmation code: ${otp.code}`;

    // this.smsService.sendSms(user.phone_number, smsContent);

    const telegramContent = `Confirmation code: ${otp.code}\nPhone number: ${user.phone_number}`;

    this.smsService.viaTelegram(telegramContent);

    return 'The one time password has been sent';
  }
}
