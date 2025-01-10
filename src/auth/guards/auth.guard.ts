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
import { ApiOneResponse } from './../../common/interfaces/api-response.interface';
import { UserEntity } from './../../users/entities/user.entity';

const UNAUTHORIZED_ERROR = new ManagerError({
  type: 'UNAUTHORIZED',
  message: 'Unauthorized!',
});

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw UNAUTHORIZED_ERROR;
    }
    
    try {
      const payload = await this.verifyToken(token);

      await this.getUser(payload.id);

      request['user'] = payload;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }

    return true;
  }

  private async verifyToken(token: string): Promise<OmitPassword> {
    const payload = await this.jwtService.verifyAsync<OmitPassword>(token, {
      secret: process.env.JWT_SECRET,
    });
    if (!payload.id) {
      throw new UnauthorizedException('Invalid token!');
    }
    return payload;
  }

  private async getUser(userId: string): Promise<ApiOneResponse<UserEntity>> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw UNAUTHORIZED_ERROR;
    }
    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
