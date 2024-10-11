import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateTrailCommentDto {
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
        example: 'Muito legal!',
      }
    )
      @IsString()
      comment: string;
}
