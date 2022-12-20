import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { UsersModule } from 'src/users/users.module';
import { OtpLogsModule } from '../otp-logs/otp-logs.module';
import { OtpLogsService } from '../otp-logs/otp-logs.service';

@Module({
  providers: [RegisterService,OtpLogsService],
  controllers: [RegisterController],
  imports:[UsersModule,OtpLogsModule]
})
export class RegisterModule {}
