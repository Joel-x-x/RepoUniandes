import { Component } from '@angular/core';
import { AccesoService } from '../service/acceso.service';
import { ModalController, NavController } from '@ionic/angular';
import { CuentaPage } from '../cuenta/cuenta.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_usuario: string = "";
  txt_clave: string = "";
  bloquear: number = 0;

  constructor(private servicio: AccesoService, private navController: NavController, private modalController: ModalController) {}

login() {
  let datos = {
    accion: 'login',
    usuario: this.txt_usuario,
    clave: this.txt_clave
  }

  this.servicio.postData(datos).subscribe((res:any) => {
    if(res.estado) {
      this.servicio.createSession('idpersona', res.persona.codigo);
      this.servicio.createSession('persona', res.persona.nombre);
      this.navController.navigateRoot(['/menu']);
      this.servicio.mostrarLoading();
    } else {
      this.bloquear++;
      if(this.bloquear >= 3) {
        this.servicio.showToast("Cuenta bloqueada", 3000);
      // Bloquear cuenta
        this.servicio.postData({accion: 'bloquear', usuario: this.txt_usuario}).subscribe((res:any) => {
          if(res.estado) {
            this.servicio.showToast(res.mensaje, 3000);
          } else {
            this.servicio.showToast(res.mensaje, 3000);
          }
        });
        this.bloquear = 0;
      } else {
        this.servicio.showToast("Credenciales incorrectas, o cuenta bloqueada al tercer intento se bloqueara la cuenta", 3500);
      }
    }
  })
}

async crear() {
  const modal = await this.modalController.create({
    component: CuentaPage
  });
  return await modal.present();
}
recuperar() {
  this.navController.navigateForward(['/rclave']);
}


// async showLoading() {
//   const loading = await this.loadingCtrl.create({
//     message: 'Dismissing after 3 seconds...',
//     duration: 3000,
//   });

//   loading.present();
// }

}
