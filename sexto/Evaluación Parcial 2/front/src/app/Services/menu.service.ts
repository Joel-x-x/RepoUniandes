import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMenu } from "../Interfaces/imenu";

@Injectable({
  providedIn: 'root'
})

export class MenuService {
  apiurl = 'http://localhost/RepoUniandes/sexto/Evaluación Parcial 2/back/controller/menus.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IMenu[]> {
    return this.lector.get<IMenu[]>(this.apiurl + 'todos');
  }

  uno(id: number): Observable<IMenu> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<IMenu>(this.apiurl + 'uno', formData);
  }

  eliminar(id: number): Observable<boolean> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.lector.post<boolean>(this.apiurl + 'eliminar', formData);
  }

  insertar(menu: IMenu): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', menu.nombre);
    formData.append('descripcion', menu.descripcion);
    formData.append('precio', menu.precio.toString());
    formData.append('disponible', menu.disponible.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(menu: IMenu): Observable<string> {
    const formData = new FormData();
    formData.append('id', menu.id.toString());
    formData.append('nombre', menu.nombre);
    formData.append('descripcion', menu.descripcion);
    formData.append('precio', menu.precio.toString());
    formData.append('disponible', menu.disponible.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }

}