// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./proveedores/proveedores.component').then((m) => m.ProveedoresComponent),
      },
      {
        path: 'nuevoproveedor',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
      },
      {
        path: 'editarproveedor/:id',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => m.NuevoproveedorComponent),
      },
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m) => m.ClientesComponent),
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
      },
      {
        path: 'menus',
        loadComponent: () => import('./menus/menus.component').then((m) => m.MenusComponent),
      },
      {
        path: 'nuevomenu',
        loadComponent: () => import('./nuevomenu/nuevomenu.component').then((m) => m.NuevomenuComponent),
      },
      {
        path: 'editarmenu/:idMenu',
        loadComponent: () => import('./nuevomenu/nuevomenu.component').then((m) => m.NuevomenuComponent),
      },
      {
        path: 'editarcliente/:idCliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => m.NuevoclienteComponent),
      },
      {
        path: 'editarorden/:id',
        loadComponent: () => import('./ordenes/nuevaorden/nuevaorden.component').then((m) => m.NuevaordenComponent)
      },
      {
        path: 'nuevaorden',
        loadComponent: () => import('./ordenes/nuevaorden/nuevaorden.component').then((m) => m.NuevaordenComponent),
      },
      {
        path: 'ordenes',
        loadComponent: () => import('./ordenes/ordenes.component').then((m) => m.OrdenesComponent)
      },
      {
        path: 'unidadmedida',
        loadComponent: () => import('./unidadmedida/unidadmedida.component').then((m) => m.UnidadmedidaComponent),
      },
      {
        path: 'nuevaunidadmedida',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
      },
      {
        path: 'editarunidadmedida/:id',
        loadComponent: () =>
          import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => m.NuevaunidadmedidaComponent),
      },
      {
        path: 'productos',
        loadComponent: () => import('./productos/productos.component').then((m) => m.ProductosComponent),
      },
      {
        path: 'nuevoproducto',
        loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
      },
      {
        path: 'editarproducto/:id',
        loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
      }
    ]
  },
  // {
  //   path: '',
  //   component: GuestComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       loadComponent: () => import('./demo/authentication/login/login.component')
  //     },
  //     {
  //       path: 'login/:id',
  //       loadComponent: () => import('./demo/authentication/login/login.component')
  //     },
  //     {
  //       path: 'register',
  //       loadComponent: () => import('./demo/authentication/register/register.component')
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
