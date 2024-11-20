import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { ManagerError } from './../common/errors/manager.error';
import { UserEntity } from './../users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ){}

  register(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async login(loginAuthDto: LoginAuthDto):Promise<{user: UserEntity;token: string;}> {
    const { email, password } = loginAuthDto;
    try{
      const user = await this.usersService.findOneByEmail(email);

      if( user.password !== password ){
        throw new ManagerError({
          type: 'BAD_REQUEST',
          message: 'Credencials not valid!',
        });
      }
      const token = this.jwtService.sign({ email: user.email, id: user.id }, {secret: process.env.JWT_SECRET})
      if(!token){
        throw new ManagerError({
          type: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error',
        })
      }
      return {user, token};
    }catch(error){
      ManagerError.createSignatureError(error.message);
    }
  }
}
