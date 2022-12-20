import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadFileDTO } from './dto/files.dto';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';
import { resolve } from 'path';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { IUser } from 'src/users/interface/user.interface';
import * as aws from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import multer from 'multer';
import config from 'src/config';

aws.config.update({
  region: config.awsService.region,
  secretAccessKey: config.awsService.secretKey,
  accessKeyId: config.awsService.accessKey,
});

const s3 = new aws.S3();

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: multerS3({
        s3: s3,
        bucket: config.awsService.name,
        key: async (_, file: Express.Multer.File, callback) => {
          callback(null, `${uuid() + '.' + mime.extension(file.mimetype)}`);
        },
      }),
    }),
  )
  uploadFile(
    @Body() body: UploadFileDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @User() user: IUser,
  ) {
    return this.filesService.upload(body, files, user);
  }
}
