import { Injectable } from '@nestjs/common';
import { IUser } from 'src/users/interface/user.interface';
import { ToursMediaRepo } from './repo/tours-media.repo';
import { CreateToursMediaDto } from './dto/create-tours-media.dto';

@Injectable()
export class ToursMediaService {
  constructor(private readonly repo:ToursMediaRepo){}

  async create(data:CreateToursMediaDto,user:IUser){
    return await this.repo.create(data,user.id);
  }

  async findAll(){
    return await this.repo.findAll();
  }

  async findOne(id:number){
    return await this.repo.findOne(id);
  } 

  async update(id:number,data:CreateToursMediaDto,user:IUser){
    return await this.repo.update(id,data,user.id);
  }

  async delete(id:number){
    return await this.repo.remove(id);
  }
}
