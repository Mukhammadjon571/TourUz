import { Module } from '@nestjs/common';
import { JwtStrategy } from './auth.strategy';
import { RegisterModule } from './register/register.module';
import { TokenModule } from './token/token.module';
import { VerifyModule } from './verify/verify.module';
import { LoginModule } from './login/login.module';

@Module({
  providers: [JwtStrategy],
  imports: [RegisterModule, TokenModule, VerifyModule, LoginModule],
})
export class AuthModule {}
