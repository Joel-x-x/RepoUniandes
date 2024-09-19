import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReporte, IReporteResponse } from '../Interfaces/ireporte';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  apiurl = 'http://localhost/RepoUniandes/sexto/Evaluación Parcial 2/back/controller/reportes.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(reporte: IReporte): Observable<IReporteResponse[]> {
    const formData = new FormData();
    formData.append('inicio', reporte.inicio);
    formData.append('fin', reporte.fin);
    return this.lector.post<IReporteResponse[]>(this.apiurl + 'reporte', formData);
  }
}
