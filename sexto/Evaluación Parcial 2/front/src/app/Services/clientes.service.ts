import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICliente } from '../Interfaces/icliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiurl = 'http://localhost/RepoUniandes/sexto/Evaluación Parcial 2/back/controller/clientes.controller.php?op=';
  constructor(private lector: HttpClient) {}

  todos(): Observable<ICliente[]> {
    return this.lector.get<ICliente[]>(this.apiurl + 'todos');
  }
  uno(id: number): Observable<ICliente> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<ICliente>(this.apiurl + 'uno', formData);
  }
  eliminar(id: number): Observable<number> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(cliente: ICliente): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('email', cliente.email);
    formData.append('telefono', cliente.telefono);
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(cliente: ICliente): Observable<string> {
    console.log(cliente);
    const formData = new FormData();
    formData.append('id', cliente.id.toString());
    formData.append('nombre', cliente.nombre);
    formData.append('apellido', cliente.apellido);
    formData.append('email', cliente.email);
    formData.append('telefono', cliente.telefono);
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
