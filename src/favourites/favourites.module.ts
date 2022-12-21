import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { FavouritesRepo } from './repo/favourites.repo';

@Module({
  providers: [FavouritesService,FavouritesRepo],
  controllers: [FavouritesController]
})
export class FavouritesModule {}
