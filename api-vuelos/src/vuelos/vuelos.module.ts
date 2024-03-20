import { Module } from '@nestjs/common';
import { VuelosController } from './vuelos.controller';
import { VuelosService } from './vuelos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VUELOS } from 'src/models/models';
import { VuelosSchema } from './schema/vuelos.schema';
import { PassengerModule } from 'src/passenger/passenger.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: VUELOS.name,
        useFactory: () => VuelosSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    PassengerModule,
  ],
  controllers: [VuelosController],
  providers: [VuelosService],
})
export class VuelosModule {}
