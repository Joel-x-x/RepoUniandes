import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/models/models';
import { IPassenger } from './passenger.interface';
import { Model } from 'mongoose';
import { PassengerDTO } from './dto/passenger.dto';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async insertar(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);
    return await newPassenger.save();
  }
  async todos(): Promise<IPassenger[]> {
    return await this.model.find();
  }
  async uno(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }
  async actualizar(
    id: string,
    passengerDTO: PassengerDTO,
  ): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }
  async eliminar(id: string) {
    await this.model.findByIdAndDelete(id);
    return { status: HttpStatus.OK, message: 'Eliminado' };
  }
}
