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

  create(dto: CreateTrailCommentDto) {
    const comment = this.repository.create(dto);
    return this.repository.save(comment);
  }

  findAll() {
    return this.repository.find({
      relations: ['trail', 'user'], // Inclui as relações para carregar os dados de `trail` e `user`
      order: { createdAt: 'DESC' }, // Ordena do mais recente para o mais antigo
    });
  }

  findByTrailId(trailId: number) {
    return this.repository.find({
      where: { trail: { id: trailId } }, // Busca pelos comentários de uma trilha específica
      relations: ['trail', 'user'], // Inclui as relações `trail` e `user`
      order: { createdAt: 'DESC' }, // Ordena do mais recente para o mais antigo
    });
  }
}
