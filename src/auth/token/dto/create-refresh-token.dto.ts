import { IsDefined, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRefreshTokenDto {
  @IsDefined()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
