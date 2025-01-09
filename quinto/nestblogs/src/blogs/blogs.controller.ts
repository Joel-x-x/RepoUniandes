import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogsDto } from './blogs.dto';
import { BlogsService } from './blogs.service';

@Controller('api/v1/blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  todos() {
    return this.blogsService.todos();
  }

  @Get(':id')
  uno(@Param('id') id:string) {
    return this.blogsService.uno(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  insertar(@Body() blog: BlogsDto) {
    return this.blogsService.insertar(blog);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() blog: BlogsDto) {
    return this.blogsService.actualizar(id, blog);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.blogsService.eliminar(id);
  }
}
