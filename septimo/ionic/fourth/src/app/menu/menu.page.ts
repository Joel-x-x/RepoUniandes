import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../service/acceso.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {
  nombre: string = "";
  contactos: any = [];
  cod_persona: string = "";

  constructor(private navController: NavController, private servicio: AccesoService) {
    this.servicio.getSession('persona').then((res: any) => {
      this.nombre = res;
    });
    this.servicio.getSession('idpersona').then((res: any) => {
      this.cod_persona = res;
      this.listarContactos();
    });
   }

  ngOnInit() {
  }

  listarContactos() {
    let datos = {
      "accion": "listar-contactos",
      "codigo": this.cod_persona
    }

    this.servicio.postData(datos).subscribe((res: any) => {
      if(res.estado) {
        this.contactos = res.data;
      } else {
        this.servicio.showToast(res.mensaje, 2000);
      }
    })
  }

  nuevo() {
    this.navController.navigateForward(['/contacto']);
  }

  ireliminar(cod_contacto: string) {
    this.navController.navigateForward(['/econtacto']);
    this.servicio.createSession('cod_contacto', cod_contacto);
  }

  ireditar(cod_contacto: string) {
    this.navController.navigateForward(['/acontacto']);
    this.servicio.createSession('cod_contacto', cod_contacto);
  }

}
