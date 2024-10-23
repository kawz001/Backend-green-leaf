import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";

export class AuthenticateUserDto {
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    password: string;
}