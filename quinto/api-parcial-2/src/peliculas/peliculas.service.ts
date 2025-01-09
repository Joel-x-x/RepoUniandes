import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PELICULAS } from 'src/models/models';
import { IPeliculas } from './peliculas.interface';
import { PeliculasDto } from './dto/peliculas.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectModel(PELICULAS.name) private readonly model:Model<IPeliculas>,
  ){}

  insertar(peliculasDTO:PeliculasDto):Promise<IPeliculas> {
    const nuevaPelicula = new this.model(peliculasDTO);
    return nuevaPelicula.save();
  }

  todos():Promise<IPeliculas[]> {
    return this.model.find().populate('actores');
  }

  uno(id:string):Promise<IPeliculas> {
    return this.model.findById(id).populate('actores');
  }

  actualizar(id:string, peliculasDto:PeliculasDto):Promise<IPeliculas> {
    return this.model.findByIdAndUpdate(id, peliculasDto, {new:true});
  }

  async eliminar(id:string) {
    await this.model.findByIdAndDelete(id);
    return {status: HttpStatus.OK, msg: 'Película eliminada'}
  }

  async insertarActor(
    peliculaId: string,
    actorId: string,
  ): Promise<IPeliculas> {
    return await this.model
      .findByIdAndUpdate(
        peliculaId,
        { $addToSet: { actores: actorId } },
        { new: true },
      )
      .populate('actores');
  }
  
}
