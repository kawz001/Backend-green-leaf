import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        description: 'First name of the user',
        example: 'Joao',
      })
    @IsString()
    firstName: string;
    @ApiProperty({
        description: 'Last name of the user',
        example: 'Alves',
      })
    @IsString()
    lastName: string;
    @ApiProperty({
        description: 'Picture of the user',
        example: 'aasdsadwqrqwrqwrwqrwqewqdsad',
      })
    @IsString()
    profilePicture: string;
}
