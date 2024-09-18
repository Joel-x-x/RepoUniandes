import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Event, ActivatedRoute } from '@angular/router';
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
import Swal from 'sweetalert2';

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
  listaDetalles: IDetalleOrden[] = [];
  listamenus: IMenu[] = [];
  totalapagar: number = 0;
  nombreSeleccionado = '';
  isModalVisible: boolean = false;

  //formgroup
  frm_orden: FormGroup;
  detalles: IDetalleOrden[] = [];
  id = 0;

  ///////
  constructor(
    private clietesServicios: ClientesService,
    // private 
    private ordenService: OrdenService,
    private detallesOrdenesService: DetallesOrdenesService,
    private menuService: MenuService,
    private navegacion: Router,
    private modal: NgbModal,
    private ruta: ActivatedRoute
  ) { }

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

    this.id = parseInt(this.ruta.snapshot.paramMap.get('id'));
    if (this.id > 0) {

      // Cargar detalles
      this.detallesOrdenesService.todos(this.id).subscribe(data => {
        console.log(data);
        this.listaDetalles = data;
      });

      this.ordenService.uno(this.id).subscribe((unaorden) => {
        this.frm_orden.controls['fecha'].setValue(unaorden.fecha);
        this.frm_orden.controls['total'].setValue(unaorden.total);
        this.frm_orden.controls['cliente_id'].setValue(unaorden.cliente_id);

        this.titulo = 'Editar Orden';
      })
    }

  }
  // Eliminar detalle
  eliminarDetalle(id: number) {
    Swal.fire({
      title: 'Detalle',
      text: 'Desea eliminar el detalle ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallesOrdenesService.eliminar(id).subscribe((res: any) => {
          // Cargar detalles
          this.detallesOrdenesService.todos(this.id).subscribe(data => {
            console.log(data);
            this.listaDetalles = data;
          });
          Swal.fire({
            title: 'Detalle',
            text: 'Detalle eliminado',
            icon: 'success'
          });
        })
      }
    });
  }

  closeModal() {
    this.isModalVisible = false;
  }

  openModal() {
    this.isModalVisible = true;
  }

  // Seleccionar menu
  seleccionarMenu(id: number) {
    this.closeModal();
    const menuSeleccionado = this.listamenus.find((menu) => menu.id === id);
    if (menuSeleccionado) {
      this.totalapagar += parseFloat(menuSeleccionado.precio.toString());

      // Crear detalle
      const detalle: IDetalleOrden = {
        id: null,
        orden_id: this.id,
        menu_id: menuSeleccionado.id,
        cantidad: 1,
        precio_unitario: parseFloat(menuSeleccionado.precio.toString()),
        total: parseFloat(menuSeleccionado.precio.toString())
      };
      // Crear detalle
      this.detallesOrdenesService.insertar(detalle).subscribe((res: any) => {
        this.detallesOrdenesService.todos(this.id).subscribe(data => {
          console.log(data);
          this.listaDetalles = data;
        });
      });
    }
  }

  grabar() {
    let orden: IOrden = {
      id: this.id,
      fecha: this.frm_orden.get('fecha')?.value,
      total: this.totalapagar,
      cliente_id: this.frm_orden.get('cliente_id')?.value
    };

    Swal.fire({
      title: 'Orden',
      text: 'Desea gurdar al Orden ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id > 0) {
          this.ordenService.actualizar(orden).subscribe((res: any) => {
            Swal.fire({
              title: 'Orden',
              text: 'Orden actualizada',
              icon: 'success'
            });
            this.navegacion.navigate(['/ordenes']);
          })
        } else {
          this.ordenService.insertar(orden).subscribe((res: any) => {
            Swal.fire({
              title: 'Orden',
              text: 'Orden creada',
              icon: 'success'
            });
            this.navegacion.navigate(['/ordenes']);
          })
        }
      }
    });
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
