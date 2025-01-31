import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../service/acceso.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  txt_cedula: string = "";
  txt_nombre: string = "";
  txt_apellido: string = "";
  txt_correo: string = "";
  mensaje: string = "";
  cod_persona: string = "";

  constructor(private accesoService: AccesoService, private navController: NavController) {
    this.accesoService.getSession("idpersona").then((res:any) => {
      this.cod_persona = res;

      this.accesoService.postData({accion: "datos-persona", codigo: this.cod_persona}).subscribe((res:any) => {
        if(res.estado) {
          this.txt_cedula = res.data.ci_persona;
          this.txt_nombre = res.data.nom_persona;
          this.txt_apellido = res.data.ape_persona;
          this.txt_correo = res.data.correo_persona;
        } else {
          this.accesoService.showToast(res.mensaje, 2000);
        }
      });
    });

   }

  ngOnInit() {
  }

  actualizar() {
    let datos = {
      "accion": "actualizar-persona",
      "codigo": this.cod_persona,
      "nombre": this.txt_nombre,
      "apellido": this.txt_apellido,
      "correo": this.txt_correo
    }

    this.accesoService.postData(datos).subscribe((res:any) => {
      if(res.estado) {
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
