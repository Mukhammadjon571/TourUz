import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
// import { ResetPasswordDto } from './dto/reset-password';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('existance/:phoneNumber')
  findUser(@Param('phoneNumber') phoneNumber: string) {
    return this.usersService.findUserByPhoneNumber(phoneNumber);
  }

  // @Post(':id/reset-password')
  // resetPassword(@Body() body: ResetPasswordDto, @Param('id') id: string) {
  //   return this.usersService.resetPassword(+id, body);
  // }

  @Get('info/:id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update(+id, body);
  }
}
