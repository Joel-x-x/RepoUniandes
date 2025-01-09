import { IPassenger } from 'src/passenger/passenger.interface';

export interface IVuelos extends Document {
  piloto: string;
  avion: string;
  fecha: Date;
  destino: string;
  passengers: IPassenger[];
}
