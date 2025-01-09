import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mode } from 'fs';
import { Model } from 'mongoose';
import { AUTOR } from 'src/models/models';
import { IAutores } from './autores.interface';
import { AutoresDTO } from './dto/autores.dto';

@Injectable()
export class AutoresService {
  constructor(
    @InjectModel(AUTOR.name) private readonly model:Model<IAutores>,) {}

    async insertar(autoresDTO:AutoresDTO):Promise<IAutores> {
      const newAutor = new this.model(autoresDTO);
      return await newAutor.save();
    }

    async todos(): Promise<IAutores[]> {
      return await this.model.find();
    }

    async uno(id: string): Promise<IAutores> {
      return await this.model.findById(id);
    }

    async actualizar(
      id: string,
      autoresDTO: AutoresDTO,
    ): Promise<IAutores> {
      return await this.model.findByIdAndUpdate(id, autoresDTO, { new: true });
    }

    async eliminar(id: string) {
      await this.model.findByIdAndDelete(id);
      return { status: HttpStatus.OK, message: 'Eliminado'};
    }
}
