import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParamsPagination } from '../core/params.pagination';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../user/role/role.decorator';
import { Role } from '../user/role/role.enum';
import { RoleGuard } from '../user/role/role.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(
    @Query() { page, offset, limit }: ParamsPagination,
    @Query('sort') sort_dict: any,
    @Query('searchQuery') search: string,
  ) {
    return this.categoryService.findAll(page, offset, limit, sort_dict, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
