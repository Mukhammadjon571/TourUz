import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/users/interface/user.interface';
import { CreateFavouritesDTO } from './dto/favourites.dto';
import { UpdateFavouritesDTO } from './dto/update-favourites.dto';
import { FavouritesService } from './favourites.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('favourites')
export class FavouritesController {
  constructor(private readonly service: FavouritesService) {}

  @Post()
  create(@Body() data: CreateFavouritesDTO, @User() user: IUser) {
    return this.service.create(data, user);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateFavouritesDTO,
    @User() user: IUser,
  ) {
    return this.service.update(+id, data, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
