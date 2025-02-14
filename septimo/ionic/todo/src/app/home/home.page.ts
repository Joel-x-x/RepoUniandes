import { AfterContentInit, Component, OnInit } from '@angular/core';
import { UtilidadesService } from '../service/utilidades.service';
import { Router } from '@angular/router';
import { PreferencesService } from '../service/preferences.service';
import { Tarea } from '../interface/tarea';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterContentInit, OnInit {
  tareas: Tarea[] = [];
  buscarInput: string = "";

  constructor(private utilidadesService: UtilidadesService, private router: Router, private preferencesService: PreferencesService, private navController: NavController) {}

  ngOnInit(): void {
    this.listar();
  }

  ngAfterContentInit(): void {
    this.listar();
  }

  buscar() {
    if(this.buscarInput === "") {
      this.listar();
      return;
    }

    this.tareas = this.tareas.filter(t => t.titulo.toLowerCase().includes(this.buscarInput.toLowerCase()));
  }

  listar() {
    this.preferencesService.listarTareas().then(
      (tareas: Tarea[]) => {
        this.tareas = tareas;
        console.log(this.tareas);
      },
      () => {
        this.utilidadesService.toast('Error al listar tareas', 2000);
      }
    );
  }

  nuevaTarea() {
    this.router.navigate(['/crear']);
  }

  editarTarea(tarea: Tarea) {
    this.router.navigate(['/editar', tarea.id]);
  }

  detalle(tarea: Tarea) {
    this.navController.navigateForward(['/detalle', tarea.id]);
  }

  eliminarTarea(tarea: Tarea) {

    this.preferencesService.eliminarTarea(tarea.id).then(
      () => {
        this.utilidadesService.mostrarLoading();
        this.utilidadesService.toast('Tarea eliminada', 2000);
        this.tareas = this.tareas.filter((t) => t.id !== tarea.id);
      },
      () => {
        this.utilidadesService.toast('Error al eliminar tarea', 2000);
      }
    );
  }


}
