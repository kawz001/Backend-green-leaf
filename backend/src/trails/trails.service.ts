import { Injectable } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchTrailDto } from './dto/search-trail.dto';

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

  async findAll(dto: SearchTrailDto) {
    const { name, page = 1, limit = 10 } = dto;
        const queryBuilder = this.repository.createQueryBuilder('trails');

        if (name) {
            queryBuilder.andWhere('trails.name LIKE :name', { name: `%${name}%` });
        }

        queryBuilder.skip((page - 1) * limit).take(limit);

        const [data, count] = await queryBuilder.getManyAndCount();

        return { data, count };
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
