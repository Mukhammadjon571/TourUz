import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsDefined } from 'class-validator';

export class CreateMessageDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsOptional()
  senderName: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsOptional()
  receiverName: string;
}
