import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TrailCommentsService } from './trail-comments.service';
import { CreateTrailCommentDto } from './dto/create-trail-comment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Trails-comments')
@Controller('trail-comments')
export class TrailCommentsController {
  constructor(private readonly trailCommentsService: TrailCommentsService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Cria um comentário para uma trilha' })
  @Post()
  create(@Body() createTrailCommentDto: CreateTrailCommentDto) {
    return this.trailCommentsService.create(createTrailCommentDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todos os comentários' })
  @Get()
  findAll() {
    return this.trailCommentsService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todos os comentários de uma trilha pelo ID' })
  @Get(':trailId') // Ajustado para pegar diretamente o número do trailId
  findByTrailId(@Param('trailId') trailId: string) {
    return this.trailCommentsService.findByTrailId(+trailId); // Converte para número
  }
}
