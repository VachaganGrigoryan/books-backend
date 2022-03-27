import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user.toObject(),
    };
  }

  async admin(user) {
    if (!user.roles?.includes('admin')) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, id: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user.toObject(),
    };
  }
}
