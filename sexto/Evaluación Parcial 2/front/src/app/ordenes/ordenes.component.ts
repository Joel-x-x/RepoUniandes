import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IOrden } from '../Interfaces/iorden';
import { Router, RouterLink } from '@angular/router';
import { OrdenService } from '../Services/orden.service';

@Component({
  selector: 'app-ordenes',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './ordenes.component.html',
  styleUrl: './ordenes.component.scss'
})
export class OrdenesComponent implements OnInit {
  listaOrdenes: IOrden[] = [];
  constructor(private ordenService: OrdenService) {}
  ngOnInit(): void {
    this.ordenService.todos().subscribe((data: IOrden[]) => {
      this.listaOrdenes = data;
      console.log(this.listaOrdenes);
    });
  }
}
