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
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ParamsPagination } from '../core/params.pagination';
import { Roles } from '../user/role/role.decorator';
import { Role } from '../user/role/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../user/role/role.guard';

@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  findAll(
    @Query() { page, offset, limit }: ParamsPagination,
    @Query('sort') sort_dict: any,
    @Query('searchQuery') search: string,
  ) {
    return this.publisherService.findAll(
      page,
      offset,
      limit,
      sort_dict,
      search,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publisherService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publisherService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  remove(@Param('id') id: string) {
    return this.publisherService.remove(id);
  }
}
