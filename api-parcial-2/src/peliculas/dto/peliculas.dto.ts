import { IsNotEmpty, IsString } from "class-validator";

export class PeliculasDto {
  @IsString()
  @IsNotEmpty({message: 'El campo es obligatorio'})
  readonly titulo:string;
  @IsString()
  @IsNotEmpty({message: 'El campo es obligatorio'})
  readonly director:string;
}