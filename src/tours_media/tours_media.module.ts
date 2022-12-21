import { Module } from '@nestjs/common';
import { ToursMediaService } from './tours_media.service';
import { ToursMediaController } from './tours_media.controller';
import { ToursMediaRepo } from './repo/tours-media.repo';

@Module({
  providers: [ToursMediaService,ToursMediaRepo],
  controllers: [ToursMediaController]
})
export class ToursMediaModule {}
