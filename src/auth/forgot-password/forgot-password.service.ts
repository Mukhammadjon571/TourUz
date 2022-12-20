import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { generateHash } from 'src/utils/bcrypt';
import { random } from 'src/utils/generator';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';

@Injectable()
export class ForgotPasswordService {
  constructor(private readonly usersService: UsersService) {}

  async forgotPassword({ email }: CreateForgotPasswordDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const newPassword = random(10);

    const hashedPassword = await generateHash(newPassword);

    this.usersService.forgotPassword(user.id, hashedPassword);

    return {
      code: 200,
      message: `Your new password: ${newPassword}`,
    };
  }
}
