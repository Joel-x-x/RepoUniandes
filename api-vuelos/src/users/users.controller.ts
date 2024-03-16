import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('api/v2/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  insertar(@Body() userDTO: UserDto) {
    return this.userService.insertar(userDTO);
  }
}