import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Valida o email e a senha para auteticar o usuario' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna todos os usuarios' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Retorna um usuario' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Realiza a edicao de campos especificos do usuario' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth('KEY_AUTH')
  @ApiOperation({ summary: 'Exclui o usuario da base de dados' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

}
