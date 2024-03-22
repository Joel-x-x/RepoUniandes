import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PeliculasService } from './peliculas.service';
import { ActoresService } from 'src/actores/actores.service';
import { PeliculasDto } from './dto/peliculas.dto';

@ApiTags('pelicula') 
@Controller('api/v1/peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService, private readonly actoresService:ActoresService) {}

  @Post()
  @ApiOperation({ summary: 'Crea Peliculas' })
  insertar(@Body() peliculasDto:PeliculasDto) {
    return this.peliculasService.insertar(peliculasDto);
  }

  @ApiOperation({ summary: 'Obtiene todas las Peliculas' })
  @Get()
  todos() {
    return this.peliculasService.todos();
  }

  @Get(':id')
  uno(@Param('id') id: string) {
    return this.peliculasService.uno(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() peliculasDto:PeliculasDto) {
    return this.peliculasService.actualizar(id, peliculasDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.peliculasService.eliminar(id);
  }

  @Post(':peliculaId/actor/:actorId')
  async agregarActor(
    @Param('peliculaId') peliculaId: string,
    @Param('actorId') actorId: string,
  ) {
    const actor = await this.actoresService.uno(actorId);
    if (!actor)
      throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
    return this.peliculasService.insertarActor(peliculaId, actorId);
  }

}
