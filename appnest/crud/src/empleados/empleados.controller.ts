import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { InterfazEmpleado } from './empleados.interface';
import { EmpleadosService } from './empleados.service';
import { EmpeladoDto } from './empleado.dto';



@Controller('api/v1/empleados')
export class EmpleadosController {
    constructor(private empleadosServicio: EmpleadosService) {}

      @Get()
      todos() {
        return this.empleadosServicio.todos();
      }
      @Get(':id')
      uno(@Param('id') id: string) {
        return this.empleadosServicio.uno(id);
      }

      @Post() 
      @UsePipes(new ValidationPipe())
      insertar(@Body() empleado: EmpeladoDto) {
        return this.empleadosServicio.insertar(empleado);
      }

      @Put(':id')
      actualizar(@Param('id') id: string, @Body() empleado: EmpeladoDto) {
        return this.empleadosServicio.actualizar(id, empleado);
      }

      @Delete(':id')
      eliminar(@Param('id') id: string) {
        return this.empleadosServicio.eliminar(id);
      }

}
