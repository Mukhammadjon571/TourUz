import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavouritesDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  tour_id: number;
}