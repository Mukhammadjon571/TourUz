import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminsRepo } from './repo/admins.repo';

@Module({
  providers: [AdminsService,AdminsRepo],
  controllers: [AdminsController]
})
export class AdminsModule {}
