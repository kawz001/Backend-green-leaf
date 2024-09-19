import { IsEmail, IsNumber, IsString } from "class-validator";

export class AuthenticateUserDto {
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}