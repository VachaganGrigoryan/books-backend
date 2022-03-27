import { Exclude, Expose, Transform } from 'class-transformer';
import { UserEntity } from '../../user/entities/user.entity';

export class LoginUserEntity {
  accessToken: string;

  @Transform(({ value }) => new UserEntity(value))
  user: UserEntity;

  constructor(partial: Partial<LoginUserEntity>) {
    Object.assign(this, partial);
  }
}
