import { PartialType } from '@nestjs/swagger';
import { CreateTrailCommentDto } from './create-trail-comment.dto';

export class UpdateTrailCommentDto extends PartialType(CreateTrailCommentDto) {}
