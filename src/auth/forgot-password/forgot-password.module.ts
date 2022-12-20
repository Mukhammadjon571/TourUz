import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [ForgotPasswordService,UsersService],
  controllers: [ForgotPasswordController],
  imports:[UsersModule]
})
export class ForgotPasswordModule {}
