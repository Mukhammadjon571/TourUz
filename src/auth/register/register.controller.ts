import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './register.service';

@Controller('/auth/register')
export class RegisterController {
  constructor(private readonly service: RegisterService) {}

  @Post()
  register(@Body() data: RegisterDto) {
    return this.service.register(data);
  }
}
