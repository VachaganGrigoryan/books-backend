import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { DoSpacesService } from './do-spaces.service';
import { MediaFileService } from './media-file.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PublicMediaFile,
  PublicMediaFileSchema,
} from './schemas/media-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: PublicMediaFile.name,
        schema: PublicMediaFileSchema,
      },
    ]),
  ],
  controllers: [MediaController],
  providers: [DoSpacesService, MediaFileService],
})
export class MediaModule {}
