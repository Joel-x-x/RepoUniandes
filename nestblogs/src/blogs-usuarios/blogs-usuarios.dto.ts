import {IsNotEmpty, IsString} from "class-validator"

export class BlogsUsuariosDto {
  @IsNotEmpty()
  @IsString()
  blog_id:string;
  @IsNotEmpty()
  @IsString()
  usuario_id:string;
}