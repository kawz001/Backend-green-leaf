export class UserResponseDto {
    name: string;
    email: string;
    profilePicture: string;
    tokens: {
      access_token: string;
      refresh_token: string;
    }
  }