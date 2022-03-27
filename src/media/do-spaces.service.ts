import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DoSpacesService {
  readonly awsS3Bucket: string;
  readonly s3: AWS.S3;

  constructor(private configService: ConfigService) {
    this.awsS3Bucket = configService.get<string>('awsS3Bucket');
    this.s3 = new AWS.S3({
      region: configService.get('awsRegion'),
      endpoint: new AWS.Endpoint(configService.get<string>('awsEndpoint')),
      credentials: new AWS.Credentials({
        accessKeyId: configService.get<string>('awsAccessKeyId'),
        secretAccessKey: configService.get<string>('awsSecretAccessKey'),
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
