import {
  Controller,
  Request,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserEntity } from './entities/login-user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return new LoginUserEntity(await this.authService.login(req.user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  @UseGuards(LocalAuthGuard)
  @Post('admin')
  async admin(@Request() req) {
    return new LoginUserEntity(await this.authService.admin(req.user));
  }
}
