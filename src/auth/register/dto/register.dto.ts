import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty()
  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @MinLength(5)
  @IsNotEmpty()
  password: string;
}
