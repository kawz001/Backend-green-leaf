import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateTrailDto } from './create-trail.dto';
import { IsString, IsNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import Difficulty from '../entities/enum/difficulty';
import { Type } from 'class-transformer';

class GeoJsonLineString {
  @ApiProperty({ example: 'LineString' })
  type: 'LineString';

  @ApiProperty({ example: [[-73.935242, 40.73061], [-73.934242, 40.73161]] })
  coordinates: [number, number][];
}

export class UpdateTrailDto extends PartialType(CreateTrailDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  distance?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty({ type: GeoJsonLineString })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoJsonLineString)
  path?: GeoJsonLineString;
}
