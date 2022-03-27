import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type PublisherDocument = Publisher & Document;

@Schema()
export class Publisher {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;
}

export const PublisherSchema = SchemaFactory.createForClass(Publisher);
