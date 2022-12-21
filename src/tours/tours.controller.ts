import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/users/interface/user.interface';
import { UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { CreateTourDTO } from './dto/create-tour.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tours')
export class ToursController {
  constructor(private readonly service: ToursService) {}

  @Post()
  create(@Body() data: CreateTourDTO, @User() user: IUser) {
    return this.service.create(data, user.id);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() data: CreateTourDTO,
    @User() user: IUser,
  ) {
    return this.service.update(id, data, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @User() user: IUser) {
    return this.service.delete(id, user.id);
  }
}
