import { Injectable } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { Trail } from './entities/trail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchTrailDto } from './dto/search-trail.dto';
import { User } from 'src/users/entities/user.entity'; // Importa a entidade User

@Injectable()
export class TrailsService {
  constructor(
    @InjectRepository(Trail)
    private readonly repository: Repository<Trail>,
    @InjectRepository(User) // Injeta o repositório de usuários
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateTrailDto) {
    const user = await this.userRepository.findOneBy({ id: dto.createdById }); // Busca o usuário pelo ID

    if (!user) {
      throw new Error('User not found'); // Lança um erro se o usuário não existir
    }

    const trail = this.repository.create({
      ...dto,
      createdBy: user, // Associa o usuário à trilha
    });
    
    return this.repository.save(trail);
  }

  async findAll(dto: SearchTrailDto) {
    const { name, page = 1, limit = 10 } = dto;
    const queryBuilder = this.repository.createQueryBuilder('trails')
      .leftJoinAndSelect('trails.createdBy', 'user'); // Faz um join para incluir o usuário

    if (name) {
      queryBuilder.andWhere('trails.name LIKE :name', { name: `%${name}%` });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    const [data, count] = await queryBuilder.getManyAndCount();

    return { data, count };
  }

  async findOne(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: ['createdBy'], // Inclui a relação com o usuário
    });
  }

  async update(id: number, dto: UpdateTrailDto) {
    const trail = await this.repository.findOneBy({ id });
    if (!trail) {
      throw new Error('Trail not found');
    }
    this.repository.merge(trail, dto);
    return this.repository.save(trail);
  }

  async remove(id: number) {
    const trail = await this.repository.findOneBy({ id });
    if (!trail) {
      throw new Error('Trail not found');
    }
    return this.repository.remove(trail);
  }
}
