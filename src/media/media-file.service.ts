import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PublicMediaFile,
  PublicMediaFileDocument,
} from './schemas/media-file.schema';
import { DoSpacesService, UploadedMulterFileI } from './do-spaces.service';

@Injectable()
export class MediaFileService {
  constructor(
    @InjectModel(PublicMediaFile.name)
    private publicMediaFile: Model<PublicMediaFileDocument>,
    private doSpacesService: DoSpacesService,
  ) {}

  async upload(file: UploadedMulterFileI, filename: string) {
    const result = await this.doSpacesService.s3
      .upload({
        Bucket: this.doSpacesService.awsS3Bucket,
        Key: filename,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
        ContentDisposition: 'inline',
      })
      .promise();

    const mediaFile = new this.publicMediaFile({
      key: result.Key,
      url: result.Location,
      mimetype: file.mimetype,
      size: file.size,
    });
    return mediaFile.save();
  }

  async delete(id: string) {
    const file = await this.publicMediaFile.findById(id).exec();

    await this.doSpacesService.s3
      .deleteObject({
        Bucket: this.doSpacesService.awsS3Bucket,
        Key: file.key,
      })
      .promise();
    return file.delete();
  }
}
