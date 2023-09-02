import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({
    message: 'Empty name company',
  })
  name: string;
  @IsNotEmpty({
    message: 'Empty address',
  })
  address: string;
  @IsNotEmpty({
    message: 'Empty description',
  })
  description: string;
}
