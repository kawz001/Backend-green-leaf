// trails.service.ts
import { Injectable } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchTrailDto } from './dto/search-trail.dto';
import { User } from 'src/users/entities/user.entity';
import { LineString } from 'geojson';

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly repository: Repository<Trail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateTrailDto) {
    const user = await this.userRepository.findOneBy({ id: dto.createdById });

    if (!user) {
      throw new Error('User not found');
    }

    const trail = this.repository.create({
      ...dto,
      createdBy: user,
      path: dto.path as LineString, // Directly assign the GeoJSON path
    });

    return this.repository.save(trail);
  }

  async update(id: number, dto: UpdateTrailDto) {
    const trail = await this.repository.findOneBy({ id });
    if (!trail) {
      throw new Error('Trail not found');
    }

    const updateData = {
      ...dto,
      path: dto.path ? (dto.path as LineString) : trail.path, // Ensure path is assigned as GeoJSON
    };

    this.repository.merge(trail, updateData);
    return this.repository.save(trail);
  }

  async findAll(dto: SearchTrailDto) {
    const { name, page = 1, limit = 10 } = dto;
    const queryBuilder = this.repository.createQueryBuilder('trail')
      .leftJoinAndSelect('trail.createdBy', 'user')
      .addSelect("ST_AsGeoJSON(trail.path)", "path");

    if (name) {
      queryBuilder.andWhere('trail.name LIKE :name', { name: `%${name}%` });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, count] = await queryBuilder.getManyAndCount();

    const formattedData = data.map(trail => ({
      ...trail,
      path: typeof trail.path === 'string' ? JSON.parse(trail.path) : trail.path,
    }));

    return { data: formattedData, count };
  }

  async findOne(id: number) {
    const trail = await this.repository.createQueryBuilder('trail')
      .where('trail.id = :id', { id })
      .leftJoinAndSelect('trail.createdBy', 'user')
      .addSelect("ST_AsGeoJSON(trail.path)", "path")
      .getOne();

    return trail
      ? {
          ...trail,
          path: typeof trail.path === 'string' ? JSON.parse(trail.path) : trail.path,
        }
      : null;
  }

  async remove(id: number) {
    const trail = await this.repository.findOneBy({ id });
    if (!trail) {
      throw new Error('Trail not found');
    }
    return this.repository.remove(trail);
  }
}
