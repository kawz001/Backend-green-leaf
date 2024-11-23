import { Injectable } from '@nestjs/common';
import { CreateTrailCommentDto } from './dto/create-trail-comment.dto';
import { TrailComment } from './entities/trail-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrailCommentsService {
  constructor(
    @InjectRepository(TrailComment)
    private readonly repository: Repository<TrailComment>,
  ) {}

  async create(dto: CreateTrailCommentDto) {
    // Criar a instância de comentário vinculando as relações
    const comment = this.repository.create({
      comment: dto.comment,
      trail: { id: dto.trail_id },
      user: { id: dto.user_id },
    });

    // Salvar o comentário
    return this.repository.save(comment);
  }

  findAll() {
    return this.repository.find({
      relations: ['trail', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  findByTrailId(trailId: number) {
    return this.repository.find({
      where: { trail: { id: trailId } },
      relations: ['trail', 'user'],
      order: { createdAt: 'DESC' },
    });
  }
}
