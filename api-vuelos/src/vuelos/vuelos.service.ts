import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VUELOS } from 'src/models/models';
import { IVuelos } from './vuelos.interface';
import { VuelosDTO } from './dto/vuelos.dto';

@Injectable()
export class VuelosService {
  constructor(
    @InjectModel(VUELOS.name) private readonly model: Model<IVuelos>,
  ) {}
  insertar(vuelosDTO: VuelosDTO): Promise<IVuelos> {
    const nuevoVuelo = new this.model(vuelosDTO);
    return nuevoVuelo.save();
  }
  todos(): Promise<IVuelos[]> {
    return this.model.find().populate('passengers');
  }
  uno(id: string): Promise<IVuelos> {
    return this.model.findById(id).populate('passengers');
  }
  actualizar(id: string, vuelosDTO: VuelosDTO): Promise<IVuelos> {
    return this.model.findByIdAndUpdate(id, vuelosDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Usuario eliminado' };
  }
  async insertarPasajero(
    vueloId: string,
    passengerId: string,
  ): Promise<IVuelos> {
    return await this.model
      .findByIdAndUpdate(
        vueloId,
        { $addToSet: { passengers: passengerId } },
        { new: true },
      )
      .populate('passengers');
  }
}
