import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BLOG } from 'src/models/models';
import { BlogsSchema } from './schema/blogs.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsController } from './blogs.controller';
import { AutoresModule } from 'src/autores/autores.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: BLOG.name,
        useFactory: () => BlogsSchema.plugin(require('mongoose-autopopulate')),
      },
    ]),
    AutoresModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
