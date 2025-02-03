import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProyectoPageRoutingModule } from './form-proyecto-routing.module';

import { FormProyectoPage } from './form-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormProyectoPageRoutingModule
  ],
  declarations: [FormProyectoPage]
})
export class FormProyectoPageModule {}
