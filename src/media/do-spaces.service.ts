import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DoSpacesService {
  readonly awsS3Bucket: string;
  readonly s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.awsS3Bucket = configService.get<string>('aws.s3Bucket');
    this.s3 = new AWS.S3({
      region: configService.get('aws.region'),
      endpoint: new AWS.Endpoint(configService.get<string>('aws.endpoint')),
      credentials: new AWS.Credentials({
        accessKeyId: configService.get<string>('aws.accessKeyId'),
        secretAccessKey: configService.get<string>('aws.secretAccessKey'),
      }),
    });
  }
}

export interface UploadedMulterFileI {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
