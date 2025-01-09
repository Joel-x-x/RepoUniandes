import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProyeccionesDto {
  @IsString()
  @IsNotEmpty({message: 'El campo es obligatorio'})
  readonly fecha: Date;
  @IsNumber()
  readonly sala: number;
  @IsString()
  @IsNotEmpty({message: 'El campo es obligatorio'})
  readonly pelicula: string;
}