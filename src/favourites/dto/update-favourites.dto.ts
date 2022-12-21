import { PartialType } from '@nestjs/swagger';
import { CreateFavouritesDTO } from './favourites.dto';

export class UpdateFavouritesDTO extends PartialType(CreateFavouritesDTO) {}
