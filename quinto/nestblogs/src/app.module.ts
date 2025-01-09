import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosService } from './usuarios/usuarios.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosModule } from './usuarios/usuarios.module';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsModule } from './blogs/blogs.module';
import { BlogsService } from './blogs/blogs.service';
import { BlogsUsuariosController } from './blogs-usuarios/blogs-usuarios.controller';
import { BlogsUsuariosModule } from './blogs-usuarios/blogs-usuarios.module';

@Module({
  imports: [UsuariosModule, RolesModule, BlogsModule, BlogsUsuariosModule],
  controllers: [AppController, UsuariosController, RolesController, BlogsController, BlogsUsuariosController],
  providers: [AppService, UsuariosService, RolesService, BlogsService],
})
export class AppModule {}
