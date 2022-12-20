import { PartialType } from '@nestjs/swagger';
import { IsDate, IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateOtpLogExternalDto {
  @IsDefined()
  @IsNumber()
  created_by: number;

  @IsDefined()
  @IsNumber()
  given_to: number;

  @IsDefined()
  @IsString()
  email: string;
}

export class CreateOtpLogInternalDto extends PartialType(
  CreateOtpLogExternalDto,
) {
  @IsDefined()
  @IsNumber()
  code: number;

  @IsDefined()
  @IsDate()
  expiration_date: Date;

  @IsDefined()
  @IsNumber()
  expiration_period: number;
}
