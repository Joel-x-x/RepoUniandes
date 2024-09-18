import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Event } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IOrden } from 'src/app/Interfaces/iorden';
import { ICliente } from 'src/app/Interfaces/icliente';
import { ClientesService } from 'src/app/Services/clientes.service';
import { OrdenService } from 'src/app/Services/orden.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { DetallesOrdenesService } from 'src/app/Services/detalle_ordenes.service';
import { IDetalleOrden } from 'src/app/Interfaces/idetalleorden';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MenuService } from 'src/app/Services/menu.service';
import { IMenu } from 'src/app/Interfaces/imenu';

@Component({
  selector: 'app-nuevaorden',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  templateUrl: './nuevaorden.component.html',
  styleUrl: './nuevaorden.component.scss'
})
export class NuevaordenComponent implements OnInit {
  //variables o constantes
  titulo = 'Nueva Orden';
  listaClientes: ICliente[] = [];
  listaClientesFiltrada: ICliente[] = [];
  listamenus: IMenu[] = [];
  totalapagar: number = 0;
  nombreSeleccionado = '';
  //formgroup
  frm_orden: FormGroup;
  detalles: IDetalleOrden[] = [];

  ///////
  constructor(
    private clietesServicios: ClientesService,
    // private 
    private ordenService: OrdenService,
    private detallesOrdenesService: DetallesOrdenesService,
    private menuService: MenuService,
    private navegacion: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.frm_orden = new FormGroup({
      fecha: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      cliente_id: new FormControl('', Validators.required)
    });

    this.clietesServicios.todos().subscribe({
      next: (data) => {
        this.listaClientes = data;
        // console.log(this.listaClientes);
        this.listaClientesFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });
    
    // Listar menus
    this.menuService.todos().subscribe((data) => {
      this.listamenus = data;
    });

  }

  // Seleccionar menu
  seleccionarMenu(id: number) {
    const menuSeleccionado = this.listamenus.find((menu) => menu.id === id);
    if (menuSeleccionado) {
      this.nombreSeleccionado = menuSeleccionado.nombre;
      this.totalapagar = menuSeleccionado.precio;
    }
  }

  grabar() {
    //pdf copn html2canva

    const DATA: any = document.getElementById('impresion');
    html2canvas(DATA).then((html) => {
      const anchoorignal = html.width;
      const altooriginal = html.height;

      const imgAncho = (anchoorignal * 1 * 200) / anchoorignal;
      const imgAlto = (altooriginal * 1 * 200) / altooriginal;

      const constenido = html.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const posicion = 0;
      pdf.addImage(constenido, 'PNG', 0, posicion, imgAncho, imgAlto);
      pdf.save('Orden.pdf');
    });

    /* pdf con jspdf
    const doc = new jsPDF();
    doc.text('Lista de prodcutos', 10, 10);

    const columnas = ['Descripcion', 'Cantidad', 'Precio', 'Subtotal', 'IVA', 'Total'];
    const filas: any[] = [];
    this.detalles.forEach((producto) => {
      const fila = [producto.Descripcion, producto.Cantidad, producto.Precio, producto.Subtotal, producto.IVA, producto.Total];
      filas.push(fila);
    });

    (doc as any).autoTable({
      head: [columnas],
      body: filas,
      start: 20
    });

    doc.save('Orden.pdf');

    /*
    let Orden: IOrden = {
      fecha: this.frm_orden.get('fecha')?.value,
      nombre: this.frm_orden.get('nombre')?.value,
      total: this.frm_orden.get('total')?.valueOrde
      Valor_IVA: this.frm_orden.get('Valor_IVA')?.value,
      cliente_id: this.frm_orden.get('cliente_id')?.value
    };

    this.OrdenService.insertar(Orden).subscribe((respuesta) => {
      if (parseInt(respuesta) > 0) {
        alert('Orden grabada');
        this.navegacion.navigate(['/Ordens']);
      }
    });*/
  }
  calculos() {
    // let nombre = this.frm_orden.get('nombre')?.value;
    // let total = 0;
    // this.frm_orden.get('total')?.setValue(total);
    // this.totalapagar = parseInt(nombre) + total;
  }

  cambio(objetoSleect: any) {
    let idCliente = objetoSleect.target.value;
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const optionText = selectedOption.textContent || '';
    this.nombreSeleccionado = selectedOption.textContent || '';
    this.frm_orden.get('cliente_id')?.setValue(idCliente);
  }

  detallesLista(evnto) {
    // this.detallesOrdenesService.todos()
    //servicio de prodcuto para cargar los productos
  }
  // Close modal menu
  

  cargaModal(valoresModal: any) {
    //detalles

  //   const nuevoProducto: any = {
  //     Descripcion: 'prodcuto 4',
  //     Cantidad: 15,
  //     Precio: 12.23,
  //     Subtotal: 15.2,
  //     IVA: 15,
  //     Total: 185.9
  //   };
  //   this.detalles.push(nuevoProducto);
  //   this.modal.dismissAll();

  //   this.detalles.reduce((valor, producto) => {
  //     this.totalapagar += producto.Total;
  //   }, 0);
  }
}
