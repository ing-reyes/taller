import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "src/common/constants/keys-roles.constant";
import { UserRole } from "src/common/enums/user-role.enum";

export const AdminAccess = () => SetMetadata( ADMIN_KEY, UserRole.ADMIN );