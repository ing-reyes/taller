import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserGender } from 'src/common/enums/user-gender.enum';
import { UserRole } from 'src/common/enums/user-role.enum';
import { PaginationDto } from 'src/common/dtos/pagination/pagination.dto';
import { ManagerError } from 'src/common/errors/manager.error';
import { ResponseAllUsers } from './interfaces/response-users.interface';

@Injectable()
export class UsersService {
  
  private users: UserEntity[] = [
    { id: '1', name: 'name1', email: 'email1@google.com', gender: UserGender.MALE, password: '123456', isActive: true, photo: 'photo1.jpg', role: UserRole.ADMIN },
    { id: '2', name: 'name2', email: 'email2@google.com', gender: UserGender.MALE, password: '123456', isActive: true, photo: 'photo2.jpg', role: UserRole.USER },
    { id: '3', name: 'name3', email: 'email3@google.com', gender: UserGender.MALE, password: '123456', isActive: true, photo: 'photo3.jpg', role: UserRole.USER },
    { id: '4', name: 'name4', email: 'email4@google.com', gender: UserGender.MALE, password: '123456', isActive: true, photo: 'photo4.jpg', role: UserRole.USER },
  ]

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const user: UserEntity = {
          ...createUserDto,
          isActive: true,
          role: UserRole.USER,
          id: (+this.users.length + 1).toString(),
      }

      this.users.push(user);

      return user;
  } catch (error) {
    ManagerError.createSignatureError(error.message);
  }
  }

  async findAll( paginationDto: PaginationDto ): Promise<ResponseAllUsers> {
    const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            if (this.users.length === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'users not found!',
                })
            }

            const total = this.users.filter((user) => user.isActive === true).length;
            const lastPage = Math.ceil(total / limit);
            const data = this.users.filter((user) => user.isActive === true).slice(skip, limit);

            return {
                page,
                limit,
                lastPage,
                total,
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const user = this.users.find((user) => user.id === id && user.isActive === true);
      if (!user) {
          throw new ManagerError({
              type: 'NOT_FOUND',
              message: 'User not found',
          });
      }
      return user;
  } catch (error) {
      ManagerError.createSignatureError(error.message);
  }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
      if (indexUser === -1) {
          throw new ManagerError({
              type: 'NOT_FOUND',
              message: 'User not found',
          });
      }

      this.users[indexUser] = {
          ...this.users[indexUser],
          ...updateUserDto,
      }
      return this.users[indexUser];
  } catch (error) {
      ManagerError.createSignatureError(error.message);
  }
  }

  remove(id: string) {
    try {
      const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
      if (indexUser === -1) {
          throw new ManagerError({
              type: 'NOT_FOUND',
              message: 'User not found',
          });
      }

      this.users[indexUser] = {
          ...this.users[indexUser],
          isActive: false,
      }

      return this.users[indexUser]

  } catch (error) {
      ManagerError.createSignatureError(error.message);
  }
  }
}
