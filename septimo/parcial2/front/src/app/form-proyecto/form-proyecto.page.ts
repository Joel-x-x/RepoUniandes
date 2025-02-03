import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { UtilidadesService } from '../service/utilidades.service';
import { NavController } from '@ionic/angular';
import { Tarea } from '../interface/tareas';

@Component({
  selector: 'app-form-proyecto',
  templateUrl: './form-proyecto.page.html',
  styleUrls: ['./form-proyecto.page.scss'],
  standalone: false,
})
export class FormProyectoPage implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  esEdicion: boolean = true;
  id: string = '';

  // Tarea
  tareas: Tarea[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private utilidadesService: UtilidadesService, private navController: NavController) { }

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    if(this.id === null) {
      this.esEdicion = false;
    } else {
      this.apiService.consultaProyecto({accion: 'uno', id: this.id}).subscribe({
        next: response => {
          this.nombre = response.datos.nombre;
          this.descripcion = response.datos.descripcion;
        }
      })
      // Listar tareas
      this.apiService.consultaTarea({accion:'listar-tareas', proyecto_id: this.id}).subscribe({
        next: response => {
          if(response.estado) {
            this.tareas = response.datos;
          } else {
            this.utilidadesService.toast(response.mensaje, 3000);
          }
        },
        error: error => {
          this.utilidadesService.toast(error.mensaje, 3000);
        }
      })
    }
  }

  crear() {
    const datos = {
      accion: 'crear',
      nombre: this.nombre,
      descripcion: this.descripcion,
    }

    this.apiService.consultaProyecto(datos).subscribe({
      next: response => {
        this.utilidadesService.toast(response.mensaje, 3000);
        this.navController.back();
      },
      error: error => {
        this.utilidadesService.toast(error.mensaje, 3000);
      }
    })
  }

  actualizar() {
    const datos = {
      accion: 'actualizar',
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion
    }

    this.apiService.consultaProyecto(datos).subscribe({
      next: response => {
        this.utilidadesService.toast(response.mensaje, 3000);
      },
      error: error => {
        this.utilidadesService.toast(error.mensaje, 3000);
      }
    })
  }

  // Tareas
  nuevaTarea() {
    this.navController.navigateForward(['/form-tarea', this.id, '']);
  }

  detalleTarea(tarea: Tarea) {
    this.navController.navigateForward(['/form-tarea', this.id, tarea.id]);
  }

  eliminarTarea(tarea: Tarea) {
    this.apiService.consultaTarea({accion: 'eliminar', id: tarea.id}).subscribe({
      next: response => {
        this.utilidadesService.toast(response.mensaje, 3000);
        this.listar();
      }
    })
  }

}
