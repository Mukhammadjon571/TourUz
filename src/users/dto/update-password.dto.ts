import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePasswordDTO{
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    newPassword: string;

}