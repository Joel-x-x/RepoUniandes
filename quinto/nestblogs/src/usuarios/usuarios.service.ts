import { Injectable } from '@nestjs/common';
import { UsuariosInterfaz } from './usuarios.interface';
import { UsuarioDto } from './usuarios.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UsuariosService {
  usuarios: UsuariosInterfaz[] = [];

  todos() {
    return this.usuarios;
  }

  uno(id:string) {
    return this.usuarios.find(usuario => usuario.id == id);
  }

  insertar(usuario: UsuarioDto) {
    const us = {
      id: uuidv4(),
      ...usuario
    };

    this.usuarios.push(us);
  }

  actualizar(id: string, usuarioActualizar:UsuarioDto) {
    const nuevoUsuario = {id, ...usuarioActualizar};
    this.usuarios = this.usuarios.map(usuario => usuario.id === id ? nuevoUsuario: usuario);
  }

  eliminar(id:string) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)
    return 'Usuario eliminado'
  }
}
