import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { PaginadosPage } from '../paginados/paginados.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isModalOpen = false;

  constructor(private navCtrl: NavController,
    private router: Router, private modalCtrl: ModalController
  ) {}

  irp2n() {
    this.navCtrl.navigateForward('/paginados')
  }

  irp2r() {
    this.router.navigate(['/paginados']);
  }

  async llamarModal() {
    const modal = await this.modalCtrl.create({
      component: PaginadosPage
    });
    return await modal.present();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
