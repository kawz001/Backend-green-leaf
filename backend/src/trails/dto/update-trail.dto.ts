import { PartialType } from '@nestjs/swagger';
import { CreateTrailDto } from './create-trail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsInt } from 'class-validator';
import Difficulty from '../entities/enum/difficulty';

export class UpdateTrailDto extends PartialType(CreateTrailDto) {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsNumber()
    distance: number;
  
    @ApiProperty()
    @IsEnum(Difficulty)
    difficulty: Difficulty;
  
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsString()
    location: string;
  
    @ApiProperty()
    @IsString()
    photo: string;
}
