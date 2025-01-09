import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PROYECCIONES } from 'src/models/models';
import { IProyecciones } from './proyecciones.interface';
import { ProyeccionesDto } from './dto/proyecciones.dto';

@Injectable()
export class ProyeccionesService {
  constructor(
    @InjectModel(PROYECCIONES.name) private readonly model:Model<IProyecciones>,
  ){}

  insertar(proyeccionesDTO:ProyeccionesDto):Promise<IProyecciones> {
    const nuevaProyeccion = new this.model(proyeccionesDTO);
    return nuevaProyeccion.save();
  }

  todos():Promise<IProyecciones[]> {
    return this.model.find();
  }

  async uno(id:string):Promise<IProyecciones> {
    return await this.model.findById(id);
  }

  async actualizar(id:string, proyeccionesDTO:ProyeccionesDto):Promise<IProyecciones> {
    return await this.model.findByIdAndUpdate(id, proyeccionesDTO, {new:true});
  }

  async eliminar(id:string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
