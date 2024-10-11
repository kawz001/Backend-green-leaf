import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'Retorna todas as trilhas ja cadastradas' })
  @Get()
  findAll() {
    return this.trailsService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna uma trilha pelo id dela' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailsService.findOne(+id);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Faz alteracao na trilha desejada' })
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
