import {IsBoolean, IsDate, IsNotEmpty, IsString} from "class-validator"

export class UsuarioDto {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  clave: string;
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsNotEmpty()
  @IsString()
  apellido: string;
  @IsNotEmpty()
  @IsString()
  nacionalidad: string;
  @IsNotEmpty()
  @IsString()
  nacimiento: Date;
  @IsBoolean()
  sexo: Boolean
}