import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";

export class CreateTrailRatingDto {
  @ApiProperty({
    example: 1,
    }
  )
  @IsInt()
  trail_id: number;

  @ApiProperty({
    example: 5,
  }
)
  @IsInt()
  user_id: number;

  @ApiProperty({
    example: 3,
  }
)
  @IsInt()
  rating: number;
}
