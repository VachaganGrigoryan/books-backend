import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { SerializeInterceptor } from './interceptor';
import { UserEntity } from './entities/user.entity';
import { plainToClass } from 'class-transformer';
import { User } from './user.decorator';
import { Roles } from './role/role.decorator';
import { Role } from './role/role.enum';
import { RoleGuard } from './role/role.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class UserController {
  constructor(private usersService: UserService) {}

  @Post()
  // @Roles(Role.Admin)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  // @UseInterceptors(new SerializeInterceptor(UserEntity))
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user): UserEntity {
    // console.log(req.user);
    // return user.toObject();
    return new UserEntity(user.toObject());
  }

  // @Get(':id')
  // async getProfileById(@Param() params): Promise<User> {
  //   return this.usersService.findBy({ id: params.id });
  // }
}
