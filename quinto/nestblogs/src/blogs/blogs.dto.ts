import {IsNotEmpty, IsNumber, IsString} from "class-validator"

export class BlogsDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @IsNotEmpty()
  @IsString()
  tema: string;
  @IsNumber()
  visitas: number;
  @IsNotEmpty()
  @IsString()
  fechaCreacion: Date;
}