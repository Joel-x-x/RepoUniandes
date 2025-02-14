import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
server: string = environment.url;
  constructor(public toastController: ToastController, public http: HttpClient, private loadingController: LoadingController) { }

  postData(body:any) {
    let head = new HttpHeaders({'Content-Type': 'application/json, charset:utf8'})
    let options = {
      headers: head
    }

    return this.http.post(this.server + "/agenda.php", JSON.stringify(body), options)
  }

  async showToast(mensaje: string, tiempo: number) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: tiempo,
      position: 'top'
    });
    toast.present();
  }

  async createSession(id: string, valor: string) {
    await Preferences.set({
      key: id,
      value: valor
    })
  }

  async getSession(id: string) {
    const item = await Preferences.get({
      key: id
    });
    return item.value;
  }

  async closeSession() {
    await Preferences.clear();
  }

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
}
