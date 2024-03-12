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

@Module({
  imports: [UsuariosModule, RolesModule, BlogsModule],
  controllers: [AppController, UsuariosController, RolesController, BlogsController],
  providers: [AppService, UsuariosService, RolesService, BlogsService],
})
export class AppModule {}
