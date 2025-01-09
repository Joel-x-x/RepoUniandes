import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BlogsDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nombre: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tema: string;
  @ApiProperty()
  @IsNumber()
  visitas: number;
}