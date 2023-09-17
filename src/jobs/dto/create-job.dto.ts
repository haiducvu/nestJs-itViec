import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;
  @IsNotEmpty()
  name: string;
}

export class CreateJobDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'Skills khong duoc de trong' })
  @IsArray({ message: 'Skills phai co dinh dang la Array' })
  @IsString({ each: true, message: 'Skill phai co dinh dang String' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'salary khong duoc de trong' })
  salary: number;

  @IsNotEmpty({ message: 'quantity khong duoc de trong' })
  quantity: number;

  @IsNotEmpty({ message: 'level khong duoc de trong' })
  level: number;

  @IsNotEmpty({ message: 'description khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'startDate khong duoc bo trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate co dinh dang la Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'endDate khong duoc bo trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate co dinh dang la Date' })
  endDate: Date;

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive phai co dinh dang la Boolean' })
  isActive: boolean;
}
