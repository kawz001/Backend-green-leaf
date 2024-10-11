import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsInt } from 'class-validator';
import Difficulty from '../entities/enum/difficulty';


export class CreateTrailDto {
  @ApiProperty({
        description: 'trail nam',
        example: 'Trilha do tatu',
      }
  )
  @IsString()
  name: string;

  @ApiProperty({
    description: 'trail distance',
    example: 1000,
  }
)
  @IsNumber()
  distance: number;

  @ApiProperty({
    description: 'trail difficulty level',
    example: 'Fácil',
  }
)
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({
    description: 'trail desc',
    example: 'Trilha do tatu dsfdsafdsafdsafadsfas',
  }
)
  @IsString()
  description: string;

  @ApiProperty({
    description: 'trail desc',
    example: 'Deserto do saara',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'trail desc',
    example: 'rewqrdsfdsgqwegqwe',
  })
  @IsString()
  photo: string;

  @ApiProperty({
    description: 'trail desc',
    example: 5,
  })
  @IsInt()
  createdById: number;
}
