import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProyeccionesService } from './proyecciones.service';
import { ProyeccionesDto } from './dto/proyecciones.dto';

@ApiTags('proyeccion')
@Controller('api/v1/proyecciones')
export class ProyeccionesController {
  constructor(private readonly proyeccionesService: ProyeccionesService) {}

  @Post()
  insertar(@Body() proyeccionesDto:ProyeccionesDto) {
    return this.proyeccionesService.insertar(proyeccionesDto);
  }

  @Get()
  todos() {
    return this.proyeccionesService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.proyeccionesService.uno(id);
  }

  @Put(':id')
  actualizar(@Param('id') id:string, @Body() proyeccionesDto:ProyeccionesDto) {
    return this.proyeccionesService.actualizar(id, proyeccionesDto); 
  }

  @Delete(':id')
  eliminar(@Param('id') id:string) {
    return this.proyeccionesService.eliminar(id);
  }
}
