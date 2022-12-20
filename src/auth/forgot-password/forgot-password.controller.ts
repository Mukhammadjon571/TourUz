import { Controller, Post, Body } from '@nestjs/common';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post()
  forgotPassword(@Body() createForgotPasswordDto: CreateForgotPasswordDto) {
    return this.forgotPasswordService.forgotPassword(createForgotPasswordDto);
  }
}
