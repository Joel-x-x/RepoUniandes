import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsString()
  readonly name: string;
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsEmail()
  @ApiProperty()
  readonly email: string;
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsString()
  @ApiProperty()
  readonly password: string;
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsString()
  @ApiProperty()
  readonly username: string;
}
