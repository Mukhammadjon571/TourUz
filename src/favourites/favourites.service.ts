import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from 'src/users/interface/user.interface';
import { CreateFavouritesDTO } from './dto/favourites.dto';
import { UpdateFavouritesDTO } from './dto/update-favourites.dto';
import { FavouritesRepo } from './repo/favourites.repo';

@Injectable()
export class FavouritesService {
  constructor(private readonly repo: FavouritesRepo) {}

  async create(data: CreateFavouritesDTO, user: IUser) {
    return this.repo.create(data, user.id);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: number) {
    const category = await this.repo.findOne(id);

    if (!category) {
      throw new NotFoundException('favourites not found');
    }

    return category;
  }

  async update(id: number, data: UpdateFavouritesDTO, user: IUser) {
    const category = await this.repo.findOne(id);

    if (!category) {
      throw new NotFoundException('data not found');
    }

    return this.repo.update(id, data, user.id);
  }

  async remove(id: number) {
    const favourites = await this.repo.findOne(id);

    if (!favourites) {
      throw new NotFoundException('data not found');
    }

    return this.repo.remove(id);
  }
}
