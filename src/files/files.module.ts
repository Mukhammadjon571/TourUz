import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { FilesRepo } from './repo/files.repo';

@Module({
  providers: [FilesService,FilesRepo],
  controllers: [FilesController]
})
export class FilesModule {}
