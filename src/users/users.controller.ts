import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Public,
  ResponseMessage,
  isUserCurrentLogIn,
} from 'src/decorator/customize';
import { IUser } from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('Create a new User')
  async create(
    @Body() createUserDto: CreateUserDto,
    @isUserCurrentLogIn() user: IUser,
  ) {
    let newUser = await this.usersService.create(createUserDto, user);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  @Get()
  @ResponseMessage('Fetch user by id')
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(currentPage, limit, qs);
  }

  @Public()
  @ResponseMessage('Fetch user by id')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(id);
    return foundUser;
  }

  @ResponseMessage('Update a User')
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @isUserCurrentLogIn() user: IUser,
  ) {
    const updateUser = await this.usersService.update(updateUserDto, user);
    return updateUser;
  }

  @ResponseMessage('Delete a User')
  @Delete(':id')
  remove(@Param('id') id: string, @isUserCurrentLogIn() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
