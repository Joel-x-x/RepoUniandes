import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
  standalone: false
})
export class TemperaturaPage implements OnInit {

  resultado: string = "";

  distancias: Array<{ clave: string; valor: string; factor: number }> = [
    { clave: "°C", valor: "Cetígrados", factor: 1 },
    { clave: "F", valor: "Fahrenheit", factor: 1.8 },
    { clave: "K", valor: "Kelvin", factor: 1 }, // + 273.15
  ];
  distanciasInvertidas: Array<{ clave: string; valor: string }> = [];

  opcion1: string = "";
  opcion2: string = "";
  numero: number = 0;

  constructor() {
    this.distanciasInvertidas = [...this.distancias].reverse();
   }

  ngOnInit() {
  }

  primeraOpcion(opcion: string) {
    this.opcion1 = opcion;
  }

  segundaOpcion(opcion: string) {
    this.opcion2 = opcion;
    this.calculo();
  }

  calculo() {
    // Obtener el factor de conversión origen
    const origenObjeto = this.distancias.find((distancia) => distancia.clave === this.opcion1);
    const factorOrigen: number = origenObjeto ? origenObjeto.factor : 0;

    // Obtener el factor de conversión del final
    const destinoObjeto = this.distancias.find(distancia => distancia.clave === this.opcion2);
    const factorDestino: number = destinoObjeto ? destinoObjeto.factor : 0;

    const valorBase = this.numero * factorOrigen;

    if(destinoObjeto?.clave === 'K') {
      this.resultado = (valorBase + 273.15) + " " + this.opcion2;
      return
    }

    this.resultado = (valorBase / factorDestino) + " " + this.opcion2;
  }
}
