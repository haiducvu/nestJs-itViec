import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    const request: Request = context.switchToHttp().getRequest();
    // You can throw an exception
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Token invalid or Not Bearer token in Header Request',
        )
      );
    }
    // check permissions
    const targetMethod = request.method;
    const targetEndpoint = request.route?.path as string;

    const permissions = user?.permissions ?? [];
    let isExist = permissions.find(
      (permission) =>
        targetMethod === permission.method &&
        targetEndpoint === permission.apiPath,
    );
    if (targetEndpoint.startsWith('/api/v1/auth')) {
      isExist = true;
    }
    if (!isExist) {
      throw new ForbiddenException('Ban khong co quyen truy cap Endpoint nay!');
    }

    return user;
  }
}
