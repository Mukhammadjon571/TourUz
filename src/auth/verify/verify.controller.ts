import { Body, Controller, Post } from '@nestjs/common';
import { VerifyDto } from './dto/verify.dto';
import { VerifyService } from './verify.service';

@Controller('/auth/verify')
export class VerifyController {
  constructor(private readonly service: VerifyService) {}

  @Post()
  verify(@Body() data: VerifyDto) {
    return this.service.verify(data);
  }
}
