import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DirectoresDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString()
  readonly nombre:string;
}