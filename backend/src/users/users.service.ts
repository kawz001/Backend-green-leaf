import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ){}
  create(dto: CreateUserDto) {
    const user = this.repository.create(dto);
    return this.repository.save(user);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({id});
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
}
