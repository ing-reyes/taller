import { SetMetadata } from "@nestjs/common";
import { USER_KEY } from "src/common/constants/keys-roles.constant";
import { UserRole } from "src/common/enums/user-role.enum";

export const UserAccess = () => SetMetadata( USER_KEY, UserRole.USER );