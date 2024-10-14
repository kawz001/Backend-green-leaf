import { IntegerType } from "typeorm";

export class UserResponseDto {
    id: IntegerType;
    name: string;
    email: string;
    profilePicture: string;
    tokens: {
      access_token: string;
      refresh_token: string;
    }
  }