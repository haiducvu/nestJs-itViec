import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import {
  Public,
  ResponseMessage,
  isUserCurrentLogIn,
} from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Response, Request } from 'express';
import { IUser } from 'src/users/users.interface';
import { RolesService } from 'src/roles/roles.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private roleService: RolesService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @UseGuards(ThrottlerGuard)
  @Throttle(5, 60)
  @Post('/login')
  @ResponseMessage('User Login')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ResponseMessage('Get user information')
  @Get('/account')
  async handleGetAccount(@isUserCurrentLogIn() user: IUser) {
    const information = (await this.roleService.findOne(user.role._id)) as any;
    user.permissions = information.permissions;
    return { user };
  }

  @Public()
  @ResponseMessage('Get User by refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }

  @ResponseMessage('Logout User')
  @Post('/logout')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @isUserCurrentLogIn() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}
