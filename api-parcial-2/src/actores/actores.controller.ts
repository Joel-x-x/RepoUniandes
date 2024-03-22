import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActoresService } from './actores.service';
import { DirectoresDto } from 'src/directores/dto/directores.dto';
import { ActoresDto } from './dto/actores.dto';

@ApiTags('actor')
@Controller('api/v1/actores')
export class ActoresController {
  constructor(private readonly actoresService: ActoresService) {}

  @Post()
  insert(@Body() directoresDto:DirectoresDto) {
    return this.actoresService.insertar(directoresDto);
  }

  @Get()
  todos() {
    return this.actoresService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.actoresService.uno(id);
  }

  @Put(':id')
  actualizar(@Param('id') id:string, @Body() actoresDto:ActoresDto) {
    return this.actoresService.actualizar(id, actoresDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id:string) {
    return this.actoresService.eliminar(id);
  }


}
