import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
