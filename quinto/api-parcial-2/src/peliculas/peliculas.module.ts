import { Module } from '@nestjs/common';
import { PeliculasController } from './peliculas.controller';
import { PeliculasService } from './peliculas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PELICULAS } from 'src/models/models';
import { PeliculasSchema } from './schema/peliculas.schema';
import { ActoresModule } from 'src/actores/actores.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PELICULAS.name,
        useFactory: () => PeliculasSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    ActoresModule,
  ],
  controllers: [PeliculasController],
  providers: [PeliculasService]
})
export class PeliculasModule {}
