import { UserGender } from "src/common/enums/user-gender.enum";
import { UserRole } from "src/common/enums/user-role.enum";

export class UserEntity {
    id: string;
    name: string;
    gender: UserGender;
    email: string;
    password: string;
    photo?: string;
    isActive: boolean;
    role: UserRole;
}
