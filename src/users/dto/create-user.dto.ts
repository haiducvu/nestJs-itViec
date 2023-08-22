import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Empty email',
    },
  )
  @IsNotEmpty({
    message: 'Empty password',
  })
  email: string;
  @IsNotEmpty()
  password: string;
  name: string;
  address: string;
}
