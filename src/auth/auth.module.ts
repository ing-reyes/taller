import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from './../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [ 
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
   ],
})
export class AuthModule {}
