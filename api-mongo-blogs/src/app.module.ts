import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PassengerModule } from './passenger/passenger.module';
import { VuelosModule } from './vuelos/vuelos.module';
import { AutoresModule } from './autores/autores.module';
import { BlogsModule } from './blogs/blogs.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.uri_mongo),
    UsersModule,
    PassengerModule,
    VuelosModule,
    AutoresModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
