import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Author, AuthorDocument } from './schemas/author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const author = new this.authorModel(createAuthorDto);
    return author.save();
  }

  async findAll(
    page = 1,
    offset = 0,
    limit = 10,
    sort_dict: any = {},
    search = '',
  ) {
    console.log(page, offset, limit, sort_dict);
    const filters: FilterQuery<AuthorDocument> = page
      ? {
          // _id: {
          //   $gt: offset,
          // },
        }
      : {};

    if (search) {
      filters.$text = {
        $search: search,
      };
    }

    const querySet = this.authorModel
      .find(filters)
      .skip(offset)
      .sort(sort_dict);

    if (limit) {
      querySet.limit(limit);
    }

    const data = await querySet;
    const count = await this.authorModel.count();
    return { data, count, page, limit };
  }

  async findOne(id: string) {
    const author = await this.authorModel.findById(id);

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorModel.findOneAndReplace(
      { _id: id },
      updateAuthorDto,
      { new: true },
    );

    if (!author) {
      throw new NotFoundException();
    }

    return author;
  }

  async remove(id: string) {
    const author = await this.authorModel.findById(id);
    return author.deleteOne();
  }
}
