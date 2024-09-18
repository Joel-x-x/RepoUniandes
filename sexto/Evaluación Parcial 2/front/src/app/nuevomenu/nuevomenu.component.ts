import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../Services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMenu } from '../Interfaces/imenu';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevomenu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nuevomenu.component.html',
  styleUrl: './nuevomenu.component.scss'
})
export class NuevomenuComponent implements OnInit {
  frm_Menu = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl(0, Validators.required),
    disponible: new FormControl(true, Validators.required),
  });

  id = 0;
  titulo = 'Nuevo Menu';

  constructor(private menuService: MenuService, private navegacion: Router, private ruta: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.ruta.snapshot.paramMap.get('idMenu'));
    if (this.id > 0) {
      this.menuService.uno(this.id).subscribe((unmenu) => {
        console.log(unmenu);
        this.frm_Menu.controls['nombre'].setValue(unmenu.nombre);
        this.frm_Menu.controls['descripcion'].setValue(unmenu.descripcion);
        this.frm_Menu.controls['precio'].setValue(unmenu.precio);
        this.frm_Menu.controls['disponible'].setValue(unmenu.disponible == 1 ? true : false);
      });
      this.titulo = 'Editar Menu';
    }
  }

  grabar() {
    let menu: IMenu = {
      id: this.id,
      nombre: this.frm_Menu.value.nombre,
      descripcion: this.frm_Menu.value.descripcion,
      precio: this.frm_Menu.value.precio,
      disponible: this.frm_Menu.value.disponible? 1 : 0
    };
    Swal.fire({
      title: 'Menus',
      text: '¿Desea grabar el menu?' + this.frm_Menu.value.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id > 0) {
          this.menuService.actualizar(menu).subscribe((res: any) => {
            Swal.fire({
              title: 'Menus',
              text: 'Menú actualizado',
              icon: 'success'
            });
            this.navegacion.navigate(['/menus']);
          });
        } else {
          this.menuService.insertar(menu).subscribe((res: any) => {
            Swal.fire({
              title: 'Menus',
              text: 'Menú insertado',
              icon: 'success'
            });
            this.navegacion.navigate(['/menus']);
          });
        }
      }
    });
  }

}
