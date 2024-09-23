import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ){}
  async create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    const hashedPassword = await this.hashPassword(user.password);
    user.password = hashedPassword;
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  findOneById(id: number) {
    return this.repository.findOneBy({id});
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({email});
  }

  findOneToLogin(email: string, password: string) {
    return this.repository.findOneBy({email, password});
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOneBy({id});
    if (!user) {
      throw new Error('User not found');
    }
    this.repository.merge(user, dto);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.repository.findOneBy({id});
    if (!user) {
      throw new Error('User not found');
    }
    return this.repository.remove(user);
  }

  async authenticate(dto: AuthenticateUserDto) {
    
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10)
  }
}
