import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DirectoresService } from './directores.service';
import { DirectoresDto } from './dto/directores.dto';

@ApiTags('director')
@Controller('api/v1/directores')
export class DirectoresController {
  constructor(private readonly directoresService:DirectoresService) {}

  @Post()
  insertar(@Body() directoresDto:DirectoresDto) {
    return this.directoresService.insertar(directoresDto);
  }

  @Get()
  todos() {
    return this.directoresService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.directoresService.uno(id);
  }

  @Put(':id')
  actualizar(@Param('id') id:string, @Body() directoreDto:DirectoresDto) {
    return this.directoresService.actualizar(id, directoreDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id:string) {
    return this.directoresService.eliminar(id);
  }
}
