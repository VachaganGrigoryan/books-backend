import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UsersDocument>,
  ) {}

  async findOne(email: string) {
    return this.usersModel.findOne({ email: email }).exec();
  }

  async findBy(param: { id: any }) {
    return this.usersModel.findOne(param).exec();
  }

  async createUser(userDto: CreateUserDto) {
    const { email, password, ...data } = userDto;

    // check if the user exists in the db
    const userInDb = await this.usersModel.findOne({ email: email }).exec();
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = new this.usersModel({
      email,
      password,
      ...data,
    });
    await user.save();

    return this.sanitizeUser(user);
  }

  sanitizeUser(user): UserEntity {
    return new UserEntity(user.toObject());
  }
}
