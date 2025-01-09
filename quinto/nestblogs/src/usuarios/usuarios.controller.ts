import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioDto } from './usuarios.dto';

@Controller('api/v1/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  todos() {
    return this.usuariosService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.usuariosService.uno(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  insertar(@Body() usuario: UsuarioDto) {
    return this.usuariosService.insertar(usuario);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() usuario: UsuarioDto) {
    return this.usuariosService.actualizar(id, usuario);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.usuariosService.eliminar(id);
  }
}
