import { Module } from '@nestjs/common';
import { JwtStrategy } from './auth.strategy';
import { RegisterModule } from './register/register.module';
import { TokenModule } from './token/token.module';
import { VerifyModule } from './verify/verify.module';
import { LoginModule } from './login/login.module';
import { OtpLogsModule } from './otp-logs/otp-logs.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
@Module({
  providers: [JwtStrategy],
  imports: [
    RegisterModule,
    TokenModule,
    VerifyModule,
    LoginModule,
    OtpLogsModule,
    ForgotPasswordModule,
    RefreshTokenModule,
  ],
})
export class AuthModule {}
