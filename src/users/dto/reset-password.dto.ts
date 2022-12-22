import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  
}
