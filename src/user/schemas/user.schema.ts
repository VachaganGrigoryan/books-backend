import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role } from '../role/role.enum';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';
export type UsersDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.String }],
    default: Role.User,
  })
  @Type(() => mongoose.Schema.Types.Array)
  roles: Role[];

  @Prop({
    default: false,
  })
  isAdmin: boolean;

  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, function (saltError, salt) {
    if (saltError) {
      return next(saltError);
    } else {
      // @ts-ignore
      const hash = bcrypt.hash(user.password, salt, function (hashError, hash) {
        if (hashError) {
          return next(hashError);
        }

        // @ts-ignore
        user.password = hash;
        next();
      });
    }
  });
});
