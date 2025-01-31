import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilidadesService } from '../service/utilidades.service';
import { PreferencesService } from '../service/preferences.service';
import { Tarea } from '../interface/tarea';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: false
})
export class DetallePage implements OnInit {
  id!: string;
  titulo: string = '';
  descripcion: string = '';
  estado: boolean = false;

  constructor(private route: ActivatedRoute, private utilidadesService: UtilidadesService, private preferencesService: PreferencesService) { }

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

}
