import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Author } from '../../author/schemas/author.schema';
import { Publisher } from '../../publisher/schemas/publisher.schema';
import { Category } from '../../category/schemas/category.schema';
import { Status } from '../status.enum';
import { Series } from '../../series/schemas/series.schema';
import { PublicMediaFile } from '../../media/schemas/media-file.schema';

export type BookDocument = Book & mongoose.Document;

@Schema()
export class Book {
  @Transform(({ value }) => value.toString())
  _id: mongoose.ObjectId;

  @Prop()
  title: string;

  @Prop({
    set: (description: string) => {
      return description.trim();
    },
  })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Author.name,
  })
  @Type(() => Author)
  author: Author;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Publisher.name,
  })
  @Type(() => Publisher)
  publisher: Publisher;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: Category[];

  @Prop()
  status: Status;

  // @Prop({
  //   default: new Date(),
  // })
  // createdAt: Date;
  //
  @Prop({
    default: new Date(),
  })
  createdAt: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Series.name,
  })
  @Type(() => Series)
  series?: Series;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: PublicMediaFile.name }],
  })
  @Type(() => PublicMediaFile)
  images: PublicMediaFile;
}

export const BookSchema = SchemaFactory.createForClass(Book);
