// search-trail.dto.ts
import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SearchTrailDto {
  @ApiProperty({
        example: 'tat',
      }
  )
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 1,
      }
  )
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    example: 10,
      }
  )
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
