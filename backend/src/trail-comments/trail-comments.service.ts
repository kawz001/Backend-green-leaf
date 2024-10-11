import { Injectable } from '@nestjs/common';
import { CreateTrailCommentDto } from './dto/create-trail-comment.dto';
import { UpdateTrailCommentDto } from './dto/update-trail-comment.dto';
import { TrailComment } from './entities/trail-comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrailCommentsService {
  constructor(
    @InjectRepository(TrailComment)
    private readonly repository: Repository<TrailComment>
  ) {}
  create(dto: CreateTrailCommentDto) {
    const comment = this.repository.create(dto)
    return this.repository.save(comment);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({id});
  }

  // update(id: number, updateTrailCommentDto: UpdateTrailCommentDto) {
  //   return `This action updates a #${id} trailComment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} trailComment`;
  // }
}
