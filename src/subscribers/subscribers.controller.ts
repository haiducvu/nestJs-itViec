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
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  ResponseMessage,
  SkipCheckPermission,
  isUserCurrentLogIn,
} from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage('Create a new subscriber')
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @isUserCurrentLogIn() user: IUser,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Post('skills')
  @ResponseMessage("Get subscriber's skills")
  @SkipCheckPermission()
  getUserSkills(@isUserCurrentLogIn() user: IUser) {
    return this.subscribersService.getSkills(user);
  }

  @Get()
  @ResponseMessage('Fetch List Permission with Pagination')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(currentPage, limit, qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('Update a subscribers')
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @isUserCurrentLogIn() user: IUser,
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @isUserCurrentLogIn() user: IUser) {
    return this.subscribersService.remove(id, user);
  }
}
