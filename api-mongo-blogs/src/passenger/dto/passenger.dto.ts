import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PassengerDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo es obligatorio' })
  @IsString()
  readonly email: string;
}
