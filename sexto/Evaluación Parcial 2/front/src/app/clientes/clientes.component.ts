import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ICliente } from '../Interfaces/icliente';
import { ClientesService } from '../Services/clientes.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent {
  listaclientes: ICliente[] = [];
  constructor(private clienteServicio: ClientesService) {}

  ngOnInit() {
    this.cargatabla();
  }
  cargatabla() {
    this.clienteServicio.todos().subscribe((data) => {
      this.listaclientes = data;
    });
  }

  eliminar(id) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar el cliente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar Cliente'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteServicio.eliminar(id).subscribe(data => {
          if(data) {
            Swal.fire('Clientes', 'El cliente ha sido eliminado.', 'success');
            this.cargatabla();
          } else {
            Swal.fire('Clientes', 'El cliente no se pudo eliminar, porque se han creado ordenes a su nombre.', 'info');
          }
        }
      );
      }
    });
  }
}
