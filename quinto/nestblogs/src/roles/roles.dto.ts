import {IsNotEmpty, IsString} from "class-validator"

export class RolesDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
}