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
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ParamsPagination } from '../core/params.pagination';
import { Roles } from '../user/role/role.decorator';
import { Role } from '../user/role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../user/role/role.guard';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll(
    @Query() { page, offset, limit }: ParamsPagination,
    @Query('sort') sort_dict: any,
    @Query('searchQuery') search: string,
  ) {
    return this.authorService.findAll(page, offset, limit, sort_dict, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
