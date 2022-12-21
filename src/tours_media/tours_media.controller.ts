import { Controller, Post,Body, Get,Param, Put, Delete } from '@nestjs/common';
import { ToursMediaService } from './tours_media.service';
import { CreateToursMediaDto } from './dto/create-tours-media.dto';
import { User } from 'src/shared/decorators/user.decorator';
import {IUser} from 'src/users/interface/user.interface';

@Controller('tours-media')
export class ToursMediaController {
  constructor(private readonly service:ToursMediaService){}

  @Post()
  create(@Body() data:CreateToursMediaDto,@User() user:IUser){
    return this.service.create(data,user);
  }

  @Get()
  findAll(){
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:number){
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id:number,@Body() data:CreateToursMediaDto,@User() user:IUser){
    return this.service.update(id,data,user);
  }

  @Delete(':id')
  delete(@Param('id') id:number){
    return this.service.delete(id);
  }
}
