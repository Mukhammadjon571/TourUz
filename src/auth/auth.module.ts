import { Module } from '@nestjs/common';
import { RegisterModule } from './register/register.module';
import { TokenModule } from './token/token.module';
import { VerifyModule } from './verify/verify.module';

@Module({
  providers: [],
  controllers: [],
  imports: [RegisterModule, TokenModule, VerifyModule]
})
export class AuthModule {}
