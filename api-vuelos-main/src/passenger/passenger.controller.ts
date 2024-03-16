import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDTO } from './dto/passenger.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('passenger')
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  insertar(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.insertar(passengerDTO);
  }
  @Get()
  todos() {
    return this.passengerService.todos();
  }
  @Get(':id')
  uno(@Param('id') id: string) {
    return this.passengerService.uno(id);
  }
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.actualizar(id, passengerDTO);
  }
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.passengerService.eliminar(id);
  }
}
