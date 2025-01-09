import { Module } from '@nestjs/common';
import { DirectoresController } from './directores.controller';
import { DirectoresService } from './directores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DIRECTORES } from 'src/models/models';
import { DirectoresSchema } from './schema/directores.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: DIRECTORES.name,
        useFactory: () => DirectoresSchema,
      },
    ]),
  ],
  controllers: [DirectoresController],
  providers: [DirectoresService],
  exports: [DirectoresService],
})
export class DirectoresModule {}
