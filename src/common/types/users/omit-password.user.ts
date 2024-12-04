import { UserEntity } from "./../../../users/entities/user.entity";

export type OmitPassword = Omit<UserEntity, "password">;