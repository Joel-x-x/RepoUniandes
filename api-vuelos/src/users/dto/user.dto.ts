import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsString()
  readonly name: string;
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsEmail()
  readonly email: string;
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsString()
  readonly password: string;
  @IsNotEmpty({ message: 'El texto es requerido' })
  @IsString()
  readonly username: string;
}