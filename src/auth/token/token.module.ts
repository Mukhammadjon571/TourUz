import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokensRepo } from './repo/token.repo';

@Module({
  providers: [TokenService,JwtService,TokensRepo],
  exports: [TokenService,JwtService,TokensRepo],
})
export class TokenModule {}
