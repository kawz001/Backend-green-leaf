import { Injectable } from '@nestjs/common';
import { CreateTrailRatingDto } from './dto/create-trail-rating.dto';
import { UpdateTrailRatingDto } from './dto/update-trail-rating.dto';
import { TrailRating } from './entities/trail-rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrailRatingsService {
  constructor(
    @InjectRepository(TrailRating)
    private readonly repository: Repository<TrailRating>
  ) {}

  create(dto: CreateTrailRatingDto) {
    const rating = this.repository.create(dto)
    return this.repository.save(rating);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({id});
  }

  // update(id: number, updateTrailRatingDto: UpdateTrailRatingDto) {
  //   return `This action updates a #${id} trailRating`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} trailRating`;
  // }
}
