import { Module } from '@nestjs/common';
import { OtpLogsService } from './otp-logs.service';
import { OtpLogsRepo } from './repo/otp-logs.repo';

@Module({
  providers: [OtpLogsService, OtpLogsRepo],
  exports: [OtpLogsService, OtpLogsRepo],
})
export class OtpLogsModule {}
