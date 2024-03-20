import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BLOG } from 'src/models/models';
import { IBlogs } from './blogs.interface';
import { BlogsDTO } from './dto/blogs.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(BLOG.name) private readonly model:Model<IBlogs>,){}

  insertar(blogsDTO: BlogsDTO): Promise<IBlogs> {
    const nuevoBlog = new this.model(blogsDTO);
    return nuevoBlog.save();
  }

  todos(): Promise<IBlogs[]> {
    return this.model.find().populate('autores');
  }

  uno(id: string): Promise<IBlogs> {
    return this.model.findById(id).populate('autores');
  }

  actualizar(id: string, blogsDTO: BlogsDTO): Promise<IBlogs> {
    return this.model.findByIdAndUpdate(id, blogsDTO, { new: true });
  }

  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return {status: HttpStatus.OK, msg: 'Blog eliminado'}
  }

  async insertarAutor(
    blogId: string,
    autorId: string,
  ): Promise<IBlogs> {
    return await this.model.findByIdAndUpdate(blogId, { $addToSet: { autores: autorId} },
    { new: true },
    )
    .populate('autores');
  }


}
