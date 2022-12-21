import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { difficultyStatusEnum } from '../enums/difficultyStatus.enum';

export class CreateTourDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  langitude: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  latitude: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsOptional()
  phone_number: string;
  
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  short_description: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  long_description: string;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  days: number;

  @ApiProperty()
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  people: number;

  @ApiProperty()
  @IsDefined()
  @IsEnum(Object.values(difficultyStatusEnum))
  @IsOptional()
  difficulty: string;
}
