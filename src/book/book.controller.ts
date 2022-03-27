import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from '../user/role/role.decorator';
import { Role } from '../user/role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ParamsPagination } from '../core/params.pagination';
import { RoleGuard } from '../user/role/role.guard';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  create(@Body() createBookDto: CreateBookDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { images, ...data } = createBookDto;
    return this.bookService.create({
      ...data,
      images: images.map((img) => img.id),
    });
  }

  @Get()
  findAll(
    @Query() { page, offset, limit }: ParamsPagination,
    @Query('searchQuery') search: string,
  ) {
    return this.bookService.findAll(page, offset, limit, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { images, ...data } = updateBookDto;
    console.log(images);
    return this.bookService.update(id, {
      ...data,
      images: images.map((img) => img.id),
    });
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
