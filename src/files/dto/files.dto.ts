import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';
import { mimetypes } from 'src/common/constants/mimetypes';

export class UploadFileDTO {
  @ApiProperty()
  @IsDefined()
  @IsEnum(Object.values(mimetypes))
  @IsOptional()
  allowedExtensions: string[];
}
