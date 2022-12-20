import { Module } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyController } from './verify.controller';
import { OtpLogsModule } from '../otp-logs/otp-logs.module';
import { OtpLogsService } from '../otp-logs/otp-logs.service';
import { TokenModule } from '../token/token.module';
import { UsersModule } from 'src/users/users.module';
import { TokenService } from '../token/token.service';
import { UsersService } from 'src/users/users.service';
import { UsersRepo } from 'src/users/repo/user.repo';

@Module({
  providers: [VerifyService,OtpLogsService,TokenService,UsersService],
  controllers: [VerifyController],
  imports:[OtpLogsModule,TokenModule,UsersModule]
})
export class VerifyModule {}
