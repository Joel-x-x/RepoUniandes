import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DIRECTORES } from 'src/models/models';
import { IDirectores } from './directores.interface';
import { DirectoresDto } from './dto/directores.dto';

@Injectable()
export class DirectoresService {
  constructor(
    @InjectModel(DIRECTORES.name) private readonly model:Model<IDirectores>,
  ){}

  async insertar(directorDTO:DirectoresDto):Promise<IDirectores> {
    const newDirector = new this.model(directorDTO);
    return await newDirector.save();
  }

  async todos():Promise<IDirectores[]> {
    return await this.model.find();
  }

  async uno(id:string):Promise<IDirectores> {
    return await this.model.findById(id);
  }

  async actualizar(id:string, directorDTO:DirectoresDto):Promise<IDirectores> {
    return await this.model.findByIdAndUpdate(id, directorDTO, {new:true});
  }

  async eliminar(id:string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
