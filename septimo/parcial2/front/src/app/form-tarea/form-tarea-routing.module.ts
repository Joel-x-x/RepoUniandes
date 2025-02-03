import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormTareaPage } from './form-tarea.page';

const routes: Routes = [
  {
    path: '',
    component: FormTareaPage
  },
  {
    path: ':id/:proyecto_id',
    component: FormTareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormTareaPageRoutingModule {}
