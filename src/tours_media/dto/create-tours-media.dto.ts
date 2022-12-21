import {ApiProperty} from '@nestjs/swagger';
import {IsDefined, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateToursMediaDto {
  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  tourId: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  mediaId: number;
}
