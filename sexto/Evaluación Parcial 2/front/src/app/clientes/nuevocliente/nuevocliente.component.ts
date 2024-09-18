import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/Services/clientes.service';
import { ICliente } from 'src/app/Interfaces/icliente';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-nuevocliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevocliente.component.html',
  styleUrl: './nuevocliente.component.scss'
})
export class NuevoclienteComponent implements OnInit {
  frm_Cliente = new FormGroup({
    //id: new FormControl(),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', Validators.required),
  });
  id = 0;
  titulo = 'Nuevo Cliente';
  constructor(
    private clienteServicio: ClientesService,
    private navegacion: Router,
    private ruta: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.ruta.snapshot.paramMap.get('idCliente'));
    if (this.id > 0) {
      this.clienteServicio.uno(this.id).subscribe((uncliente) => {
        this.frm_Cliente.controls['nombre'].setValue(uncliente.nombre);
        this.frm_Cliente.controls['apellido'].setValue(uncliente.apellido);
        this.frm_Cliente.controls['email'].setValue(uncliente.email);
        this.frm_Cliente.controls['telefono'].setValue(uncliente.telefono);
        /*this.frm_Cliente.setValue({
          nombre: uncliente.nombre,
          apellido: uncliente.apellido,
          telefono: uncliente.telefono,
          Cedula: uncliente.Cedula,
          email: uncliente.email
        });*/
        /*this.frm_Cliente.patchValue({
          Cedula: uncliente.Cedula,
          email: uncliente.email,
          nombre: uncliente.nombre,
          apellido: uncliente.apellido,
          telefono: uncliente.telefono
        });*/

        this.titulo = 'Editar Cliente';
      });
    }
  }

  grabar() {
    let cliente: ICliente = {
      id: this.id,
      nombre: this.frm_Cliente.controls['nombre'].value,
      apellido: this.frm_Cliente.controls['apellido'].value,
      email: this.frm_Cliente.controls['email'].value,
      telefono: this.frm_Cliente.controls['telefono'].value,
    };
    Swal.fire({
      title: 'Clientes',
      text: 'Desea gurdar al Cliente ' + this.frm_Cliente.controls['nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id > 0) {
          this.clienteServicio.actualizar(cliente).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              title: 'Clientes',
              text: 'Cliente actualizado',
              icon: 'success'
            });
            this.navegacion.navigate(['/clientes']);
          });
        } else {
          this.clienteServicio.insertar(cliente).subscribe((res: any) => {
            Swal.fire({
              title: 'Clientes',
              text: 'Cliente insertado',
              icon: 'success'
            });
            this.navegacion.navigate(['/clientes']);
          });
        }
      }
    });
  }
}
