import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesDto } from './roles.dto';

@Controller('api/v1/roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  todos() {
    return this.rolesService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.rolesService.uno(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  insertar(@Body() rol: RolesDto) {
    return this.rolesService.insertar(rol);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() rol: RolesDto) {
    return this.rolesService.actualizar(id, rol);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.rolesService.eliminar(id);
  }
}
