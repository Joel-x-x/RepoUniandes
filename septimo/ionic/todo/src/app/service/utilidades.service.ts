import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor(private loadingController: LoadingController) { }

  async mostrarLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();

    setTimeout(() => {
      loading.dismiss();
      window.location.reload();
    }, 1000);
  }

  toast(mensaje: string, tiempo: number) {
    new ToastController().create({
      message: mensaje,
      duration: tiempo
    }).then(toast => toast.present());
  }
}
