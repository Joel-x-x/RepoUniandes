import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_n1: string = "";
  txt_n2: string = "";
  txt_r: string = "";

  constructor() {}

  sumar() {
    let n1 = parseInt(this.txt_n1);
    let n2 = parseInt(this.txt_n2);
    let r = n1 + n2;
    this.txt_r = r.toString();
  }
  restar() {
    let n1 = parseInt(this.txt_n1);
    let n2 = parseInt(this.txt_n2);
    let r = n1 - n2;
    this.txt_r = r.toString();
  }
  multiplicar() {
    let n1 = parseInt(this.txt_n1);
    let n2 = parseInt(this.txt_n2);
    let r = n1 * n2;
    this.txt_r = r.toString();
  }
  dividir() {
    let n1 = parseInt(this.txt_n1);
    let n2 = parseInt(this.txt_n2);
    let r = n1 / n2;
    this.txt_r = r.toString();
  }

}
