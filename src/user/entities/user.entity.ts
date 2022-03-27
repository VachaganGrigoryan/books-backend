import { Exclude, Expose, Transform } from 'class-transformer';

export class UserEntity {
  _id: string;
  fullName: string;
  email: string;
  phone: string;

  @Expose()
  get id(): string {
    return this._id.toString();
  }

  @Exclude()
  password: string;

  @Exclude()
  isAdmin: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
