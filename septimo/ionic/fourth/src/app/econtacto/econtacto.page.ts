import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccesoService } from '../service/acceso.service';

@Component({
  selector: 'app-econtacto',
  templateUrl: './econtacto.page.html',
  styleUrls: ['./econtacto.page.scss'],
  standalone : false,
})
export class EcontactoPage implements OnInit {
  contacto: any = [];
  cod_contacto: string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_telefono: string = "";
  txt_correo: string = "";
  mensaje: string = "";
  public botones = [
    {
      text: 'No',
      role: 'alert-button-cancel',
      handler: () => {
        this.cancelar();
    },
    },
    {
      text: 'Si',
      role: 'alert-button-confirm',
      handler: () => {
        this.eliminar();
      }
    }
  ];
  constructor(private navController: NavController, private servicio: AccesoService) {
    this.servicio.getSession("cod_contacto").then((res: any) => {
      this.cod_contacto = res;
      this.cargarDatos();
    });
   }

  ngOnInit() {
  }

  cargarDatos() {
    let datos = {
      "accion": "dcontacto",
      "codigo": this.cod_contacto,
    }

    this.servicio.postData(datos).subscribe((res: any) => {
      if (res.estado) {
        this.contacto = res.datos;
        this.txt_nombre = this.contacto.nombre;
        this.txt_apellido = this.contacto.apellido;
        this.txt_telefono = this.contacto.telefono;
        this.txt_correo = this.contacto.correo;
      } else {
        this.servicio.showToast(res.mensaje, 3000);
      }
    });
  }

  cancelar() {
    this.navController.back();
  }

  eliminar() {
    let datos = {
      'accion': 'econtacto',
      'codigo': this.cod_contacto
    };

    this.servicio.postData(datos).subscribe((res: any) => {
      if(res.estado) {
        this.servicio.showToast(res.mensaje, 3000);
        this.navController.navigateRoot(['/menu']);
      } else {
        this.servicio.showToast(res.mensaje, 3000);
      }
    });
  }
}
