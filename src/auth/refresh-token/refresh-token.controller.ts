import { Body, Controller, Inject, Put } from '@nestjs/common';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenService } from './refresh-token.service';

@Controller('/auth/refresh-token')
export class RefreshTokenController {
  @Inject() private readonly service: RefreshTokenService;

  @Put()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.service.refreshToken(refreshTokenDto);
  }
}
