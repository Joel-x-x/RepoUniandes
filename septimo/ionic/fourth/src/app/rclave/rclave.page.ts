import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../service/acceso.service';

@Component({
  selector: 'app-rclave',
  templateUrl: './rclave.page.html',
  styleUrls: ['./rclave.page.scss'],
  standalone: false,
})
export class RclavePage implements OnInit {
  txt_pregunta1: string = "";
  txt_pregunta2: string = "";
  confirmado: boolean = false;
  clave: string = "";

  constructor(private navController: NavController, private accesoService: AccesoService) { }

  ngOnInit() {
  }

  confirmar() {
    this.accesoService.postData({ accion: "confirmar-datos", pregunta1: this.txt_pregunta1, pregunta2: this.txt_pregunta2 }).subscribe((res: any) => {
      if (res.estado) {
        this.confirmado = true;
      } else {
        this.accesoService.showToast(res.mensaje, 3000);
      }
    });
  }

  cambiarClave() {
    this.accesoService.postData({ accion: "cambiar-clave", pregunta1: this.txt_pregunta1, pregunta2: this.txt_pregunta2, clave: this.clave }).subscribe((res: any) => {
      if (res.estado) {
        this.accesoService.showToast(res.mensaje, 3000);
        this.navController.back();
      } else {
        this.accesoService.showToast(res.mensaje, 3000);
      }
    });
  }

  cancelar() {
    this.navController.back();
  }


}
