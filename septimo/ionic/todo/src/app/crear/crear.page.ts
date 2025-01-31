import { Component, OnInit } from '@angular/core';
import { UtilidadesService } from '../service/utilidades.service';
import { v4 as uuid } from 'uuid';
import { PreferencesService } from '../service/preferences.service';
import { Tarea } from '../interface/tarea';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: false
})
export class CrearPage implements OnInit {
  titulo: string = '';
  descripcion: string = '';
  estado: boolean = false;

  constructor(private utilidadesService: UtilidadesService, private preferencesService: PreferencesService, private router: Router) { }

  ngOnInit() {
  }

  guardar() {
    if (this.titulo.trim() === '') {
      this.utilidadesService.toast('El título es obligatorio', 2000);
      return;
    }

    const tarea: Tarea = {
      id: uuid(),
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado
    };

    this.preferencesService.guardarTarea(tarea);
    this.utilidadesService.toast('Tarea guardada', 2000);
    this.titulo = '';
    this.descripcion = '';
    this.router.navigate(['/home']);
    this.utilidadesService.mostrarLoading();
  }

}
