import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormProyectoPage } from './form-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: FormProyectoPage
  },
  {
    path: ':id',
    component: FormProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormProyectoPageRoutingModule {}
