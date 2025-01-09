import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AUTOR } from 'src/models/models';
import { AutoresSchema } from './schema/autores.schema';
import { AutoresController } from './autores.controller';
import { AutoresService } from './autores.service';

@Module({
    imports: [
      MongooseModule.forFeatureAsync([
        {
          name: AUTOR.name,
          useFactory: () => AutoresSchema,
        }
      ])
    ],
    controllers: [AutoresController],
    providers: [AutoresService],
    exports: [AutoresService],
})
export class AutoresModule {}
