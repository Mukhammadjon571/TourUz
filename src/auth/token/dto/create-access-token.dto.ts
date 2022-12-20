import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateAccessTokenDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  email: string;
}
