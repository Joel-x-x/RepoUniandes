import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost/RepoUniandes/septimo/parcial2/back/';

  constructor(private http: HttpClient) { }

  consultaProyecto(body: any): Observable<any> {
    return this.http.post(this.apiUrl + 'proyecto.php', JSON.stringify(body));
  }

  consultaTarea(body: any): Observable<any> {
    return this.http.post(this.apiUrl + 'tarea.php', JSON.stringify(body));
  }
}
