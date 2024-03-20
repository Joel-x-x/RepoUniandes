import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class VuelosDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly piloto: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly avion: string;
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly fecha;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destino: string;
}
