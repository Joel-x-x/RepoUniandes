import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('api/v2/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  insertar(@Body() userDTO: UserDTO) {
    return this.userService.insertar(userDTO);
  }
  @Get()
  todos() {
    return this.userService.todos();
  }

  @Get(':id')
  uno(@Param('id') id: string) {
    return this.userService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.userService.actualizar(id, userDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.userService.eliminar(id);
  }
}
