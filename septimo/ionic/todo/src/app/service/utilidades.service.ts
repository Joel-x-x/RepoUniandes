import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  toast(mensaje: string, tiempo: number) {
    new ToastController().create({
      message: mensaje,
      duration: tiempo
    }).then(toast => toast.present());
  }
}
