import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ADMIN_KEY, PUBLIC_KEY, USER_KEY } from 'src/common/constants/keys-roles.constant';
import { UserRole } from './../../common/enums/user-role.enum';
import { ManagerError } from './../../common/errors/manager.error';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService:JwtService,
    private readonly reflector:Reflector,
  ){}
  async canActivate( context: ExecutionContext ): Promise<boolean> {
    

    const request = context.switchToHttp().getRequest<Request>();
    const isAdmin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());
    const isRoles = this.reflector.get<Array<keyof typeof UserRole>>(UserRole, context.getHandler());
    
    const user = request['user'];

    if(isPublic) return true;

    try {
      if(isRoles===undefined){
        if( !isAdmin ){
          return true;
        }
  
        if( user.role === isAdmin ){
          return true
        }
  
        throw new ManagerError({type: 'UNAUTHORIZED', message: 'Unauthorized!'});
      }

      if( user.role === UserRole.ADMIN ) return true;

      const isAuth = isRoles.some((rol)=>rol===user.role);
      if(!isAuth) {
        throw new ManagerError({type: 'UNAUTHORIZED', message: 'Unauthorized!'});
      }

      return true;
    } catch (error) {
      ManagerError.createSignatureError(error.message);
    }

    return true;
  }
}
