import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class ActoresDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: "El campo es obligatorio"})
  readonly nombre:string;
}