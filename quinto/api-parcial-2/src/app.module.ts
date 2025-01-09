import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { ActoresModule } from './actores/actores.module';
import { DirectoresModule } from './directores/directores.module';
import { ProyeccionesModule } from './proyecciones/proyecciones.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.uri_mongo),
    UsersModule,
    AuthModule,
    PeliculasModule,
    ActoresModule,
    DirectoresModule,
    ProyeccionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
