import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'FullName need to be string.' })
  fullName: string;

  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'example@e-mail.com', description: 'Email' })
  @IsString({ message: 'Email need to be string.' })
  @IsEmail({}, { message: 'Email Address' })
  email: string;

  @IsNotEmpty()
  phone: string;
}
