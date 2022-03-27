import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Transform } from 'class-transformer';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop()
  fullName: string;

  @Prop()
  bio: string;

  @Prop()
  avatar: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
