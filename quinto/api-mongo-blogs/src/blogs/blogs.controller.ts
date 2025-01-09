import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { AutoresService } from 'src/autores/autores.service';
import { BlogsDTO } from './dto/blogs.dto';

@ApiTags('blogs')
@Controller('api/v1/blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService,
    private readonly autoresService: AutoresService){}

    @Post()
    @ApiOperation({ summary: 'Crea Blogs' })
    insertar(@Body() blogsDTO: BlogsDTO) {
      return this.blogsService.insertar(blogsDTO);
    }

    @Get()
    @ApiOperation({ summary: 'Lista Blogs' })
    todos() {
      return this.blogsService.todos();
    }

    @Get(':id')
    uno(@Param('id') id: string) {
      return this.blogsService.uno(id);
    }

    @Put(':id')
    actualizar(@Param('id') id: string, @Body() blogsDTO: BlogsDTO) {
      return this.blogsService.actualizar(id, blogsDTO);
    }

    @Delete(':id')
    eliminar(@Param('id') id: string) {
      return this.blogsService.eliminar(id);
    }

    @Post('/:blogId/autor/:autorId')
    async agregarAutor(
      @Param('blogId') blogId: string,
      @Param('autorId') autorId: string,
    ) {
      const autor = await this.autoresService.uno(autorId);
      if(!autor)
        throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
      return this.blogsService.insertarAutor(blogId, autorId);
    }

}
