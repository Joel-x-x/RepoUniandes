import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'form-proyecto',
    loadChildren: () => import('./form-proyecto/form-proyecto.module').then( m => m.FormProyectoPageModule)
  },
  {
    path: 'form-tarea',
    loadChildren: () => import('./form-tarea/form-tarea.module').then( m => m.FormTareaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
