import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../service/acceso.service';

@Component({
  selector: 'app-acontacto',
  templateUrl: './acontacto.page.html',
  styleUrls: ['./acontacto.page.scss'],
})
export class AcontactoPage implements OnInit {
  contacto: any = [];
  cod_contacto: string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_telefono: string = "";
  txt_correo: string = "";
  mensaje: string = "";

  constructor(private servicio: AccesoService) {
    this.servicio.getSession("idpersona").then((res:any) => {
      this.cod_contacto = res;
      this.cargarDatos();
    });
   }

   cargarDatos() {
    let datos = {
      "accion": "dcontacto",
      "cod_contacto": this.cod_contacto,
    }

    this.servicio.postData(datos).subscribe((res:any) => {
      if(res.estado) {
        this.contacto = res.data;
        this.txt_nombre = this.contacto.nombre;
        this.txt_apellido = this.contacto.apellido;
        this.txt_telefono = this.contacto.telefono;
        this.txt_correo = this.contacto.correo;
      } else {
        this.servicio.showToast(res.mensaje, 3000);
      }
    });
   }

  ngOnInit() {
  }

}
