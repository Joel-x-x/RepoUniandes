import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadosModule } from './empleados/empleados.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CoModule } from './s/co/co.module';
import { EmpleadosModule } from './empleados/empleados.module';

@Module({
  imports: [EmpleadosModule, UsuariosModule, CoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
