import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string;

  @IsEmail({}, { message: 'Email khong dung dinh dang' })
  @IsNotEmpty({ message: 'Email khong duoc de trong' })
  email: string;

  @IsNotEmpty({ message: 'Skills khong duoc de trong' })
  @IsArray({ message: 'Skills co dinh dang la Array' })
  @IsString({ each: true, message: 'Skill dinh dang la string' })
  skills: string[];
}
