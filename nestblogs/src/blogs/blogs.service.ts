import { Injectable } from '@nestjs/common';
import { BlogsInterfaz } from './blogs.interface';
import { BlogsDto } from './blogs.dto';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class BlogsService {
  blogs: BlogsInterfaz[] = [];

  todos() {
    return this.blogs;
  }

  uno(id:string) {
    return this.blogs.find(blog => blog.id == id);
  }

  insertar(blog: BlogsDto) {
    const b = {
      id: uuidv4(),
      ...blog
    };

    this.blogs.push(b);
  }

  actualizar(id: string, blogActualizar:BlogsDto) {
    const nuevoblog = {id, ...blogActualizar};
    this.blogs = this.blogs.map(blog => blog.id === id ? nuevoblog: blog);
  }

  eliminar(id:string) {
    this.blogs = this.blogs.filter(blog => blog.id !== id)
    return 'blog eliminado'
  }
}
