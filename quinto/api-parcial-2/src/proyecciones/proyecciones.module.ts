import { Module } from '@nestjs/common';
import { ProyeccionesService } from './proyecciones.service';
import { ProyeccionesController } from './proyecciones.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PROYECCIONES } from 'src/models/models';
import { ProyeccionesSchema } from './schema/proyecciones.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PROYECCIONES.name,
        useFactory: () => ProyeccionesSchema,
      }
    ]),
  ],
  providers: [ProyeccionesService],
  controllers: [ProyeccionesController],
  exports: [ProyeccionesService]
})
export class ProyeccionesModule {}
