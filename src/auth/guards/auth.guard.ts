import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { OmitPassword } from './../../common/types/users/omit-password.user';
import { UsersService } from '../../users/users.service';
import { ManagerError } from './../../common/errors/manager.error';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    try {
      if (!token) {
        throw new ManagerError({
          type: 'UNAUTHORIZED',
          message: 'Unauthorized!',
        });
      }

      const payload = await this.jwtService.verifyAsync<OmitPassword>(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!payload.id) throw new UnauthorizedException('Invalid token!');

      const user = await this.usersService.findOne(payload.id);
      if (!user) {
        throw new ManagerError({
          type: 'UNAUTHORIZED',
          message: 'Unauthorized!',
        });
      }

      request['user'] = payload;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
