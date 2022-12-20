import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from 'src/users/users.module';
import { OtpLogsModule } from '../otp-logs/otp-logs.module';
import { OtpLogsService } from '../otp-logs/otp-logs.service';

@Module({
  providers: [LoginService, OtpLogsService],
  controllers: [LoginController],
  imports: [UsersModule, OtpLogsModule],
})
export class LoginModule {}
