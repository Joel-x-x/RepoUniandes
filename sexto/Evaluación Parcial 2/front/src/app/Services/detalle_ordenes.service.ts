import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IDetalleOrden } from '../Interfaces/idetalleorden';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetallesOrdenesService {
  apiurl = 'http://localhost/RepoUniandes/sexto/Evaluación Parcial 2/back/controller/detalle_ordenes.controller.php?op=';
  constructor(private lector: HttpClient) {}

  todos(orden_id: number): Observable<IDetalleOrden[]> {
    const formData = new FormData();
    formData.append('orden_id', orden_id.toString());
    return this.lector.post<IDetalleOrden[]>(this.apiurl + 'todos', formData);
  }
  uno(id: number): Observable<IDetalleOrden> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IDetalleOrden>(this.apiurl + 'uno', formData);
  }
  eliminar(id: number): Observable<boolean> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<boolean>(this.apiurl + 'eliminar', formData);
  }
  insertar(detalleorden: IDetalleOrden): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', detalleorden.nombre);
    formData.append('orden_id', detalleorden.orden_id.toString());
    formData.append('menu_id', detalleorden.menu_id.toString());
    formData.append('precio_unitario', detalleorden.precio_unitario.toString());
    formData.append('cantidad', detalleorden.cantidad.toString());
    formData.append('total', detalleorden.total.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(detalleorden: IDetalleOrden): Observable<string> {
    console.log(detalleorden);
    const formData = new FormData();
    formData.append('id', detalleorden.id.toString());
    formData.append('nombre', detalleorden.nombre);
    formData.append('orden_id', detalleorden.orden_id.toString());
    formData.append('menu_id', detalleorden.menu_id.toString());
    formData.append('precio_unitario', detalleorden.precio_unitario.toString());
    formData.append('cantidad', detalleorden.cantidad.toString());
    formData.append('total', detalleorden.total.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
