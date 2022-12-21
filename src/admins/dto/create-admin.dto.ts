import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
