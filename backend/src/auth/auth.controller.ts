import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authenticate')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({summary:'Login na plataforma e obter o access token'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type:'string', example: 'joao@gmail.com' },
        password: { type:'string', example: '123456' }
      },
      required: ['email', 'password']
    },
    required: true
  })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async signIn(@Body() dto: LoginDto) {
    return await this.authService.signIn(dto)
  }
}
