import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadFileDTO } from './dto/files.dto';
import { FilesRepo } from './repo/files.repo';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';
import { IUser } from 'src/users/interface/user.interface';
import config from 'src/config';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepo: FilesRepo) {}

  upload(
    { allowedExtensions }: UploadFileDTO,
    files: Array<Express.Multer.File>,
    user: IUser,
  ) {
    const customizedFiles = [];

    for (const file of files) {
      const extension: string = this.getExtension(file.mimetype);

      if (
        Array.isArray(allowedExtensions) &&
        !allowedExtensions.includes(extension)
      ) {
        throw new BadRequestException(`
        File extension ${extension} is not allowed
        `);
      }

      customizedFiles.push({
        original_name: file.originalname,
        filename:
          `${config.awsService.url}/${file['key']}` ||
          `{config.awsService.url}${
            uuid() + '.' + this.getExtension(file.mimetype)
          }`,
        mimetype: file.mimetype,
        extension,
        created_by: user?.id,
        size: file.size,
      });
    }

    return this.filesRepo.upload(customizedFiles);
  }

  saveFileCridentials(files) {
    return this.filesRepo.upload(files);
  }

  private getExtension(mimetype: string) {
    return mime.extension(mimetype);
  }

  findManyByIds(ids: number[]) {
    return this.filesRepo.findManyByIds(ids);
  }
}
