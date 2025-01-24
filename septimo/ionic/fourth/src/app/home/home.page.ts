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

  constructor(private servicio: AccesoService, private navController: NavController, private modalController: ModalController) {}

login() {
  let datos = {
    accion: 'login',
    usuario: this.txt_usuario,
    clave: this.txt_clave
  }

  this.servicio.postData(datos).subscribe((res:any) => {
    console.log(res);
    if(res.estado) {
      this.servicio.createSession('idpersona', res.id);
      this.servicio.createSession('persona', res.persona.nombre);
      this.navController.navigateRoot(['/menu']);
    } else {
      this.servicio.showToast("No encontro al persona", 3000);
    }
  })
}

async crear() {
  const modal = await this.modalController.create({
    component: CuentaPage
  });
  return await modal.present();
}
recuperar() {}


// async showLoading() {
//   const loading = await this.loadingCtrl.create({
//     message: 'Dismissing after 3 seconds...',
//     duration: 3000,
//   });

//   loading.present();
// }

}
