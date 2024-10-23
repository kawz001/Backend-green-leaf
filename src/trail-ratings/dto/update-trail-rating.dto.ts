import { PartialType } from '@nestjs/swagger';
import { CreateTrailRatingDto } from './create-trail-rating.dto';

export class UpdateTrailRatingDto extends PartialType(CreateTrailRatingDto) {}
