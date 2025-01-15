import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-paginados',
  templateUrl: './paginados.page.html',
  styleUrls: ['./paginados.page.scss'],
  standalone: false,
})
export class PaginadosPage implements OnInit {

  constructor(private navCtrl: NavController, private router: Router) { }

  ngOnInit() {
  }


}
