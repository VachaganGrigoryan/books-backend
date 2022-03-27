import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from '../user/role/role.decorator';
import { Role } from '../user/role/role.enum';
import { Book, BookDocument } from './schemas/book.schema';
import { ExtractJwt } from 'passport-jwt';
import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookData: CreateBookDto) {
    const createdBook = new this.bookModel(createBookData);
    return createdBook.save();
  }

  async findAll(
    page?: number,
    offset?: number,
    limit?: number,
    search?: string,
  ) {
    console.log(page, offset, limit);
    const filters: FilterQuery<BookDocument> = page
      ? {
          // _id: {
          //   $gt: page,
          // },
        }
      : {};

    if (search) {
      filters.$text = {
        $search: search,
      };
    }

    const findQuery = this.bookModel
      .find(filters)
      .sort({ createdAt: 1 })
      .populate('author')
      .populate('publisher')
      .populate('categories')
      .populate('images');

    if (limit) {
      // findQuery.limit(limit);
    }

    const data = await findQuery;
    const count = await this.bookModel.count();

    return { count, data };
  }

  async findOne(id: string) {
    const book = await this.bookModel
      .findById(id)
      .populate('author')
      .populate('publisher')
      .populate('categories')
      .populate('images');
    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.bookModel.findOneAndReplace(
      { _id: id },
      updateBookDto,
      { new: true },
    );

    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  async remove(id: string) {
    const book = await this.bookModel.findById(id);
    return book.deleteOne();
  }
}
