import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/models/models';
import { IUser } from './user.interface';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel(USER.name) private readonly modelo: Model<IUser>) {}
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async insertar(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.modelo({ ...userDTO, password: hash });
    return await newUser.save();
  }
  async todos(): Promise<IUser[]> {
    return await this.modelo.find();
  }
  async uno(id: string): Promise<IUser> {
    return await this.modelo.findById(id);
  }
  async actualizar(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const user = { ...userDTO, password: hash };
    return await this.modelo.findByIdAndUpdate(id, user, { new: true });
  }
  async eliminar(id: string) {
    await this.modelo.findByIdAndDelete(id);
    return { status: HttpStatus.OK, msg: 'Usuario eliminado' };
  }
}
