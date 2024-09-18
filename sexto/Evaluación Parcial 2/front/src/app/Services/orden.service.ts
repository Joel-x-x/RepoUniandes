import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrden } from '../Interfaces/iorden';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {
  apiurl = 'http://localhost/RepoUniandes/sexto/Evaluación Parcial 2/back/controller/ordenes.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IOrden[]> {
    return this.lector.get<IOrden[]>(this.apiurl + 'todos');
  }

  uno(id: number): Observable<IOrden> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IOrden>(this.apiurl + 'uno', formData);
  }

  insertar(orden: IOrden): Observable<string> {
    const formData = new FormData();
    formData.append('fecha', orden.fecha);
    formData.append('total', orden.total.toString());
    formData.append('cliente_id', orden.cliente_id.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(orden: IOrden): Observable<string> {
    const formData = new FormData();
    formData.append('id', orden.id.toString());
    formData.append('fecha', orden.fecha);
    formData.append('total', orden.total.toString());
    formData.append('cliente_id', orden.cliente_id.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

  actualizarTotal(id: number): Observable<number> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<number>(this.apiurl + 'actualizar-total', formData);
  }

}
