import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchTrailDto } from './dto/search-trail.dto';

@ApiTags('Trails')
@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Cria uma nova trilha' })
  @Post()
  create(@Body() createTrailDto: CreateTrailDto) {
    return this.trailsService.create(createTrailDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todas as trilhas cadastradas' })
  @Get()
  async findAll(@Query() dto: SearchTrailDto) {
    const { data, count } = await this.trailsService.findAll(dto);
    const currentPage = dto.page || 1;
    const limit = dto.limit || 10;
    const totalPages = Math.ceil(count / limit);

    return {
      data,
      count,
      currentPage,
      totalPages,
    };
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna uma trilha pelo ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailsService.findOne(+id);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Faz alteração na trilha desejada' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto) {
    return this.trailsService.update(+id, updateTrailDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Exclui o registro da trilha' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trailsService.remove(+id);
  }
}