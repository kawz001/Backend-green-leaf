import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrailCommentsService } from './trail-comments.service';
import { CreateTrailCommentDto } from './dto/create-trail-comment.dto';
import { UpdateTrailCommentDto } from './dto/update-trail-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Trails-comments')
@Controller('trail-comments')
export class TrailCommentsController {
  constructor(private readonly trailCommentsService: TrailCommentsService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Cria um comentario para uma trilha' })
  @Post()
  create(@Body() createTrailCommentDto: CreateTrailCommentDto) {
    return this.trailCommentsService.create(createTrailCommentDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todos os comentarios' })
  @Get()
  findAll() {
    return this.trailCommentsService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todos os comentarios de uma trilha' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailCommentsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrailCommentDto: UpdateTrailCommentDto) {
  //   return this.trailCommentsService.update(+id, updateTrailCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trailCommentsService.remove(+id);
  // }
}
