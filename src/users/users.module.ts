import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepo } from './repo/user.repo';

@Module({
  providers: [UsersService,UsersRepo],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
