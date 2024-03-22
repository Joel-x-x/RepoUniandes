import { IActores } from "src/actores/actores.interface";

export interface IPeliculas extends Document {
  titulo:string;
  director:string;
  actores: IActores[];
}
