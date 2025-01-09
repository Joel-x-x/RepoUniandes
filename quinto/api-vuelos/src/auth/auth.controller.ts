import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { UserDTO } from 'src/users/dto/user.dto';

@ApiTags('Autenticacion')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    return this.authService.singIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.singUp(userDTO);
  }
}
