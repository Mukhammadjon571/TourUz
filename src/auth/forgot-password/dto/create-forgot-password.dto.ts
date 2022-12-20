import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  email: string;
}
