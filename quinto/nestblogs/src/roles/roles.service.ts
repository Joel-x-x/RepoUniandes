import { Injectable } from '@nestjs/common';
import { RolesInterfaz } from './roles.interface';
import { RolesDto } from './roles.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class RolesService {
  roles: RolesInterfaz[] = [];

  todos() {
    return this.roles;
  }

  uno(id:string) {
    return this.roles.find(rol => rol.id == id);
  }

  insertar(rol: RolesDto) {
    const r = {
      id: uuidv4(),
      ...rol
    };

    this.roles.push(r);
  }

  actualizar(id: string, rolActualizar:RolesDto) {
    const nuevorol = {id, ...rolActualizar};
    this.roles = this.roles.map(rol => rol.id === id ? nuevorol: rol);
  }

  eliminar(id:string) {
    this.roles = this.roles.filter(rol => rol.id !== id)
    return 'rol eliminado'
  }
}
