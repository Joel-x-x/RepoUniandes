import { Component } from '@angular/core';
import { SharedModule } from '../theme/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IMenu } from '../Interfaces/imenu';
import { MenuService } from '../Services/menu.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent {
  listamenus: IMenu[] = [];

  constructor(private menuServicio: MenuService) {}

  ngOnInit(): void {
    this.menuServicio.todos().subscribe((data) => {
      this.listamenus = data;
    });
  }

  eliminar(id) {
    Swal.fire({
      title: 'Menus',
      text: 'Esta seguro que desea eliminar el menu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar Menu'
    }).then((result) => {
      if (result.isConfirmed) {
        this.menuServicio.eliminar(id).subscribe(data => {
          if(data) {
            Swal.fire('Menus', 'El menu ha sido eliminado.', 'success');
            this.ngOnInit();
          } else {
            Swal.fire('Menus', 'El menu no se pudo eliminar, porque se han creado ordenes con el.', 'info');
          }
        });
      }
    })
  }
}
