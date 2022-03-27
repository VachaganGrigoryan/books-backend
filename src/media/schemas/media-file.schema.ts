import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type PublicMediaFileDocument = PublicMediaFile & Document;

@Schema()
export class PublicMediaFile {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  public url: string;

  @Prop()
  public key: string;

  @Prop()
  mimetype: string;

  @Prop()
  size: number;
}

export const PublicMediaFileSchema =
  SchemaFactory.createForClass(PublicMediaFile);
