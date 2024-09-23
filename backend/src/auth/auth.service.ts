import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ){}
  async signIn(dto: LoginDto): Promise<{access_token: string}> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException();
    } else if (!bcrypt.compare(user.password, dto.password)) {
      throw new UnauthorizedException();
    }
    const payload = {id: user.id, email: user.email, name: (user.firstName + '' + user.lastName)};
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
