import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersModule } from 'src/users/users.module';
import { OtpLogsModule } from '../otp-logs/otp-logs.module';
import { OtpLogsService } from '../otp-logs/otp-logs.service';
import { TokenService } from '../token/token.service';
import { TokenModule } from '../token/token.module';

@Module({
  providers: [LoginService, OtpLogsService,TokenService],
  controllers: [LoginController],
  imports: [UsersModule, OtpLogsModule,TokenModule],
})
export class LoginModule {}
