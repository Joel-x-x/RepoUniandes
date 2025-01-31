import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilidadesService } from '../service/utilidades.service';
import { PreferencesService } from '../service/preferences.service';
import { Tarea } from '../interface/tarea';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
  standalone: false
})
export class EditarPage implements OnInit {
  id!: string;
  titulo: string = '';
  descripcion: string = '';
  estado: boolean = false;

  constructor(private route: ActivatedRoute, private utilidadesService: UtilidadesService, private preferencesService: PreferencesService, private router: Router) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    // Obtener tarea
    const tarea: Tarea | null = await this.preferencesService.obtenerTarea(this.id);

    if (tarea) {
      this.titulo = tarea.titulo;
      this.descripcion = tarea.descripcion;
      this.estado = tarea.estado;
    } else {
      this.utilidadesService.toast('Error al obtener tarea', 2000);
    }
  }

  actualizar() {
    if (this.titulo.trim() === '') {
      this.utilidadesService.toast('El título es obligatorio', 2000);
      return;
    }

    const tarea: Tarea = {
      id: this.id,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado
    };

    this.preferencesService.actualizarTarea(tarea);
    this.utilidadesService.toast('Tarea actualizada', 2000);
    this.router.navigate(['/home']);
    this.utilidadesService.mostrarLoading();
  }

}
