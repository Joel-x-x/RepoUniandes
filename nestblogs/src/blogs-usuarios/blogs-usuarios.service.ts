import { Injectable } from '@nestjs/common';
import {v4 as uuidv4} from 'uuid';
import { BlogsUsuariosInterfaz } from './blogs-usuarios.interface';
import { BlogsUsuariosDto } from './blogs-usuarios.dto';

@Injectable()
export class BlogsUsuariosService {
  blogsUsuarios: BlogsUsuariosInterfaz[] = [];

  todos() {
    return this.blogsUsuarios;
  }

  uno(id:string) {
    return this.blogsUsuarios.find(blogsUsuario => blogsUsuario.id == id);
  }

  insertar(blogUsuario: BlogsUsuariosDto) {
    const bu = {
      id: uuidv4(),
      ...blogUsuario
    };

    this.blogsUsuarios.push(bu);
  }

  actualizar(id: string, blogUsuarioActualizar:BlogsUsuariosDto) {
    const nuevoblogUsuario = {id, ...blogUsuarioActualizar};
    this.blogsUsuarios = this.blogsUsuarios.map(blogsUsuario => blogsUsuario.id === id ? nuevoblogUsuario: blogsUsuario);
  }

  eliminar(id:string) {
    this.blogsUsuarios = this.blogsUsuarios.filter(blogsUsuario => blogsUsuario.id !== id)
    return 'relacion eliminada'
  }
}
