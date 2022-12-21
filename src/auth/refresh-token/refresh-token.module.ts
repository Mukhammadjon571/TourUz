import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefreshTokenController } from './refresh-token.controller';
import { TokenModule } from '../token/token.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { TokenService } from '../token/token.service';

@Module({
  providers: [RefreshTokenService, UsersService, TokenService],
  controllers: [RefreshTokenController],
  imports: [TokenModule, UsersModule],
})
export class RefreshTokenModule {}
