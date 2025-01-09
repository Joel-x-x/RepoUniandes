import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AutoresService } from './autores.service';
import { AutoresDTO } from './dto/autores.dto';

@ApiTags('autor')
@Controller('api/v1/autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  insertar(@Body() autoresDTO: AutoresDTO) {
    return this.autoresService.insertar(autoresDTO);  
  }
  @Get()
  todos() {
    return this.autoresService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.autoresService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() autoresDTO: AutoresDTO) {
    return this.autoresService.actualizar(id, autoresDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.autoresService.eliminar(id);
  }
}
