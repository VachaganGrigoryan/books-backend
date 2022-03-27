import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';
import { MediaFileService } from './media-file.service';
import { v4 as uuid } from 'uuid';
import { Roles } from '../user/role/role.decorator';
import { Role } from '../user/role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../user/role/role.guard';

@Controller('media')
export class MediaController {
  constructor(
    // private s3Service: DoSpacesService,
    private mediaFileService: MediaFileService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async uploadFile(
    @Body() body: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(body, file);
    const filename = `${body?.location || 'upload/'}${uuid()}-${
      file.originalname
    }`;
    return await this.mediaFileService.upload(file, filename);
  }
}
