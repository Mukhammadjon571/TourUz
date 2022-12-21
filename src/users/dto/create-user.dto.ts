import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsDefined()
  @IsString()
  @IsOptional()
  username: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @Min(5)
  @Max(256)
  password: string;

  @IsDefined()
  @IsString()
  @IsOptional()
  phone_number: string;

  @IsDefined()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDefined()
  @IsString()
  @IsOptional()
  avatar: string;

  @IsDefined()
  @IsObject()
  @IsOptional()
  avatar_json: Record<string, string>;

  @IsDefined()
  @IsString()
  @IsOptional()
  is_verified: boolean;
}
