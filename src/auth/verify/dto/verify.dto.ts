import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
