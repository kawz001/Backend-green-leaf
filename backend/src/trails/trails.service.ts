import { Injectable } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly repository: Repository<Trail>
  ) {}
  create(dto: CreateTrailDto) {
    const trail = this.repository.create(dto);
    return this.repository.save(trail);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({id});
  }

  async update(id: number, dto: UpdateTrailDto) {
    const trail = await this.repository.findOneBy({id});
    if (!trail) {
      throw new Error('Trail not found');
    }
    this.repository.merge(trail, dto);
    return this.repository.save(trail);
  }

  async remove(id: number) {
    const trail = await this.repository.findOneBy({id});
    if (!trail) {
      throw new Error('Trail not found');
    }
    return this.repository.remove(trail);
  }
}
