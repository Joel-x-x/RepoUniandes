import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Estado } from '../interface/tareas';
import { UtilidadesService } from '../service/utilidades.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form-tarea',
  templateUrl: './form-tarea.page.html',
  styleUrls: ['./form-tarea.page.scss'],
  standalone: false,
})
export class FormTareaPage implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  esEdicion: boolean = true;
  id: string = '';
  proyecto_id: string = '';
  estado: Estado = Estado.Pendiente;
  estados = Object.values(Estado);

  constructor(private apiService: ApiService, private route: ActivatedRoute, private utilidadesService: UtilidadesService, private navController: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('proyecto_id') || '';
    this.proyecto_id = this.route.snapshot.paramMap.get('id') || '';

    if(this.id == '') {
      this.esEdicion = false;
    } else if(this.id != '' && this.proyecto_id != '') {
      this.apiService.consultaTarea({accion: 'uno', id: this.id}).subscribe({
        next: response => {
          this.nombre = response.datos.nombre;
          this.descripcion = response.datos.descripcion;
          this.estado = response.datos.estado;
        }
      })
    }
  }

  back() {
    this.navController.back();
  }

  capitalize(value: string): string {
    if (!value) return value; // Si el valor está vacío o nulo, retorna el mismo valor
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

  crear() {
    const datos = {
      accion: 'crear',
      nombre: this.nombre,
      descripcion: this.descripcion,
      estado: this.estado,
      proyecto_id: this.proyecto_id
    }
    console.log(datos);
    this.apiService.consultaTarea(datos).subscribe({
      next: response => {
        if(response.estado) {
          this.utilidadesService.toast(response.mensaje, 3000);
          this.navController.back();
        }
      }
    });
  }

  actualizar() {
    const datos = {
      accion: 'actualizar',
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      estado: this.estado
    }

    this.apiService.consultaTarea(datos).subscribe({
      next: response => {
        this.utilidadesService.toast(response.mensaje, 3000);
        this.navController.back();
      }
    });
  }

}
