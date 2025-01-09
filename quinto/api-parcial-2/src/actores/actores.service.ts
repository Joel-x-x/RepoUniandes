import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ACTORES } from 'src/models/models';
import { IActores } from './actores.interface';
import { Model } from 'mongoose';
import { ActoresDto } from './dto/actores.dto';

@Injectable()
export class ActoresService {
  constructor(
    @InjectModel(ACTORES.name) private readonly model:Model<IActores>
  ) {}

  async insertar(actoresDTO:ActoresDto):Promise<IActores> {
    const newActor = new this.model(actoresDTO);
    return await newActor.save();
  }

  async todos():Promise<IActores[]> {
    return await this.model.find();
  }

  async uno(id:string):Promise<IActores> {
    return await this.model.findById(id);
  }

  async actualizar(id:string, actoresDto:ActoresDto):Promise<IActores> {
    return await this.model.findByIdAndUpdate(id, actoresDto, {new:true});
  }

  async eliminar(id:string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
