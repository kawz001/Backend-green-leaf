import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrailRatingsService } from './trail-ratings.service';
import { CreateTrailRatingDto } from './dto/create-trail-rating.dto';
import { UpdateTrailRatingDto } from './dto/update-trail-rating.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Trails-ratings')
@Controller('trail-ratings')
export class TrailRatingsController {
  constructor(private readonly trailRatingsService: TrailRatingsService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Cria uma avaliacao para a trilha' })
  @Post()
  create(@Body() createTrailRatingDto: CreateTrailRatingDto) {
    return this.trailRatingsService.create(createTrailRatingDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todas as avaliacoes das trilhas' })
  @Get()
  findAll() {
    return this.trailRatingsService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todas as avaliacoes de uma trilha por id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailRatingsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTrailRatingDto: UpdateTrailRatingDto) {
  //   return this.trailRatingsService.update(+id, updateTrailRatingDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trailRatingsService.remove(+id);
  // }
}
