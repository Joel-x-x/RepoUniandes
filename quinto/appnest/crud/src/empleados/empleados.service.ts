import { Injectable } from '@nestjs/common';
import { InterfazEmpleado } from './empleados.interface';
import { v4 as uuidv4 } from 'uuid';
import { EmpeladoDto } from './empleado.dto';

@Injectable()
export class EmpleadosService {

  empleados:InterfazEmpleado[] = [];

  todos() {
    return this.empleados;
  }

  uno(id:string) {
    return this.empleados.find(empleado => empleado.id == id);
  }

  insertar(empleado:EmpeladoDto) {
    const emp = {
      id:uuidv4(),
      ...empleado
    };

    this.empleados.push(emp);
  }

  actualizar(id:string, empleadoActualizar:EmpeladoDto) {
    const nuevoemp = {id, ...empleadoActualizar};
    this.empleados = this.empleados.map(empleado => empleado.id === id ? nuevoemp : empleado);
  }

  eliminar(id:string) {
    this.empleados = this.empleados.filter(empleado => empleado.id !== id)
    return 'Empleado eliminado';
  }
}
