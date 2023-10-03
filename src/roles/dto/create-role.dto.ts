import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'description khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive co gia tri la boolean' })
  isActive: string;

  @IsNotEmpty({ message: 'permissions khong duoc de trong' })
  @IsMongoId({ each: true, message: 'each permission la mongo object id' })
  @IsArray({ message: 'permission co dinh dang la Array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
