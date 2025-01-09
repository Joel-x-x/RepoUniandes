import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EmpeladoDto {
  @IsNotEmpty()
  @IsString()
  nombres: string;
  @IsNotEmpty()
  @IsString()
  apellidos: string;
  @IsNumber()
  edad: number;
  @IsDate()
  fecha_nacimientos: Date;
  @IsNotEmpty()
  @IsString()
  cedula: string;
}