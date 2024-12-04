import { OmitPassword } from "../users/omit-password.user";

declare namespace Express {
    export interface Request{
        user: OmitPassword;
    }
}