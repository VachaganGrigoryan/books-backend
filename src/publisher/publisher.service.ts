import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Publisher, PublisherDocument } from './schemas/publisher.schema';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<PublisherDocument>,
  ) {}

  async create(createPublisherDto: CreatePublisherDto) {
    const publisher = new this.publisherModel(createPublisherDto);
    return publisher.save();
  }

  async findAll(
    page = 1,
    offset = 0,
    limit = 10,
    sort_dict: any = {},
    search = '',
  ) {
    console.log(page, offset, limit, sort_dict);
    const filters: FilterQuery<PublisherDocument> = page
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

    const querySet = this.publisherModel
      .find(filters)
      .skip(offset)
      .sort(sort_dict);

    if (limit) {
      querySet.limit(limit);
    }
    const data = await querySet;
    const count = await this.publisherModel.count();
    return { data, count, page, limit };
  }

  async findOne(id: string) {
    const publisher = await this.publisherModel.findById(id);

    if (!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }

  async update(id: string, updatePublisherDto: UpdatePublisherDto) {
    const publisher = await this.publisherModel.findOneAndReplace(
      { _id: id },
      updatePublisherDto,
      { new: true },
    );

    if (!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }

  async remove(id: string) {
    const publisher = await this.publisherModel.findById(id);
    return publisher.deleteOne();
  }
}
