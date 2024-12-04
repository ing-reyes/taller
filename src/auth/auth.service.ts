import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { ManagerError } from './../common/errors/manager.error';
import { UserEntity } from './../users/entities/user.entity';
import { OmitPassword } from 'src/common/types/users/omit-password.user';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ){}

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async login(loginAuthDto: LoginAuthDto):Promise<{user: OmitPassword;token: string;}> {
    const { email, password } = loginAuthDto;
    try{
      const user = await this.usersService.findOneByEmail(email);

      if( user.password !== password ){
        throw new ManagerError({
          type: 'BAD_REQUEST',
          message: 'Credencials not valid!',
        });
      }
      const { password:destructuring, ...rest } = user;
      const token = this.jwtService.sign(rest, {secret: process.env.JWT_SECRET})
      if(!token){
        throw new ManagerError({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        })
      }
      return {user: rest, token};
    }catch(error){
      ManagerError.createSignatureError(error.message);
    }
  }
}
