import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  access_token: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
