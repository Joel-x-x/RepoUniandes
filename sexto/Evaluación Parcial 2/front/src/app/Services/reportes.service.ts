import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReporte } from '../Interfaces/ireporte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  apiurl = 'http://localhost/RepoUniandes/sexto/Evaluación Parcial 2/back/controller/reportes.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(inicio: string, fin: string): Observable<IReporte[]> {
    const formData = new FormData();
    formData.append('inicio', inicio);
    formData.append('fin', fin);
    return this.lector.post<IReporte[]>(this.apiurl + 'reporte', formData);
  }
}
