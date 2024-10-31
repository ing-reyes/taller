import { Injectable } from "@nestjs/common";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {

    private users: UserEntity[] = [
        { id: '1', name: 'mariana', email: 'mariana@gmail.com', password: '123456', gender: 'female' },
        { id: '2', name: 'maria', email: 'maria@gmail.com', password: '123456', gender: 'female' },
        { id: '3', name: 'sandra', email: 'sandra@gmail.com', password: '123456', gender: 'female' },
        { id: '4', name: 'carla', email: 'carla@gmail.com', password: '123456', gender: 'female' },
    ];

    create( createUserDto: CreateUserDto ){
        return createUserDto;
    }

    findAll(){
        return this.users;
    }

    findOne( id: string ){
        return `findOne by id ${id}`;
    }

    update( id: string, updateUserDto: UpdateUserDto ){
        return {
            id,
            user: updateUserDto,
        };
    }

    remove( id: string ){
        return `remove by id ${id}`;
    }
}