import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('/auth/login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Post()
  login(@Body() data: LoginDto) {
    return this.service.login(data);
  }

  @Post("/admin")
  loginAdmin(@Body() data: LoginDto) {
    return this.service.loginAdmin(data);
  }


}
