import { Module } from '@nestjs/common';
import { BlogsUsuariosService } from './blogs-usuarios.service';

@Module({
  providers: [BlogsUsuariosService]
})
export class BlogsUsuariosModule {}
