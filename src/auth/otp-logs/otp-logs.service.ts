import { Injectable } from '@nestjs/common';
import { CreateOtpLogExternalDto } from './dto/create-otp-log.dto';
import { OtpLogsRepo } from './repo/otp-logs.repo';
import * as dayjs from 'dayjs';

@Injectable()
export class OtpLogsService {
  constructor(private readonly repo: OtpLogsRepo) {}

  async create(data: CreateOtpLogExternalDto) {
    const expirationDate: Date = this.generateExpirationDate();
    const expirationPeriod: number = this.expirationPeriod;

    await this.repo.inactivateOldestOtpLogsByUserIdOrEmail(
      data.given_to,
      data.email,
    );

    return this.repo.create({
      ...data,
      expiration_date: expirationDate,
      expiration_period: expirationPeriod,
      code: this.code,
    });
  }

  private get expirationPeriod(): number {
    return 60000 * 5;
  }

  private get code() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  private generateExpirationDate(): Date {
    return dayjs(new Date()).add(this.expirationPeriod).toDate();
  }

  findLatestOtpLogByEmail(email: string) {
    return this.repo.findLatestOtpLogByEmail(email);
  }

  inactivateOtpLogById(id: number) {
    return this.repo.inactivateOtpLogById(id);
  }

  inactivateOtpLogByUserId(userId: number) {
    return this.repo.inactivateOtpLogByUserId(userId);
  }
}
