import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsInt } from 'class-validator';
import Difficulty from '../entities/enum/difficulty';


export class CreateTrailDto {
  @ApiProperty({
        example: 'Trilha do tatu',
      }
  )
  @IsString()
  name: string;

  @ApiProperty({
    example: 1000,
  }
)
  @IsNumber()
  distance: number;

  @ApiProperty({
    example: 'Fácil',
  }
)
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({
    example: 'Trilha do tatu dsfdsafdsafdsafadsfas',
  }
)
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Deserto do saara',
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 'rewqrdsfdsgqwegqwe',
  })
  @IsString()
  photo: string;

  @ApiProperty({
    example: 5,
  })
  @IsInt()
  createdById: number;
}
