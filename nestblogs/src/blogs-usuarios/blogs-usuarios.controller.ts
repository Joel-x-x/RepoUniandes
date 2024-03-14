import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogsUsuariosService } from './blogs-usuarios.service';
import { BlogsUsuariosDto } from './blogs-usuarios.dto';

@Controller('blogs-usuarios')
export class BlogsUsuariosController {
  constructor(private blogsUsuariosService: BlogsUsuariosService) {}

  @Get()
  todos() {
    return this.blogsUsuariosService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.blogsUsuariosService.uno(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  insertar(@Body() blogsUsuariosDto: BlogsUsuariosDto) {
    return this.blogsUsuariosService.insertar(blogsUsuariosDto);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() blogsUsuariosDto: BlogsUsuariosDto) {
    return this.blogsUsuariosService.actualizar(id, blogsUsuariosDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.blogsUsuariosService.eliminar(id);
  }
}
