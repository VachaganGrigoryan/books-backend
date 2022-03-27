import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll(
    page = 1,
    offset = 0,
    limit = 10,
    sort_dict: any = {},
    search = '',
  ) {
    console.log(sort_dict);
    const filters: FilterQuery<CategoryDocument> = page ? {} : {};

    if (search) {
      filters.$text = {
        $search: search,
      };
    }

    const querySet = this.categoryModel
      .find(filters)
      .skip(offset)
      .sort(sort_dict);

    if (limit) {
      querySet.limit(limit);
    }

    const data = await querySet;
    const count = await this.categoryModel.count();
    console.log(count, page, limit);
    return { data, count, page, limit };
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
