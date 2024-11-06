import { UserEntity } from "../entities/user.entity";

export interface ResponseAllUsers{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: UserEntity[];
}