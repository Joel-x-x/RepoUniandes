import { AfterContentInit, Component, OnInit } from '@angular/core';
import { UtilidadesService } from '../service/utilidades.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Proyecto } from '../interface/proyectos';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterContentInit, OnInit {
  proyectos: Proyecto[] = [];
  buscarInput: string = "";

  constructor(private utilidadesService: UtilidadesService, private router: Router, private apiService: ApiService, private navController: NavController) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  buscar() {
    if(this.buscarInput === "") {
      this.listar();
      return;
    }

    this.proyectos = this.proyectos.filter(proyecto => proyecto.nombre.toLowerCase().includes(this.buscarInput.toLowerCase()));
  }

  listar() {
    this.apiService.consultaProyecto({accion: 'listar'}).subscribe({
      next: (response) => {
        if(response.estado) {
          this.proyectos = response.datos;
        } else {
          this.utilidadesService.toast("Aun no has creado ningun proyecto.", 3000);
        }
      }
    })
  }

  detalle(proyecto: Proyecto) {
    this.navController.navigateForward(['/form-proyecto', proyecto.id]);
  }

  nuevo() {
    this.navController.navigateForward(['/form-proyecto'])
  }

  eliminar(proyecto: Proyecto) {
    this.apiService.consultaProyecto({accion: 'eliminar', id: proyecto.id}).subscribe({
      next: response => {
        console.log(response);
        this.utilidadesService.toast(response.mensaje, 3000);
        this.listar();
      }
    }
    )
  }
}
