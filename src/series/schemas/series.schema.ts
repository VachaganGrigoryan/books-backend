import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type SeriesDocument = Series & Document;

@Schema()
export class Series {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  name: string;
}

export const SeriesSchema = SchemaFactory.createForClass(Series);
