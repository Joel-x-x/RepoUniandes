import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormTareaPageRoutingModule } from './form-tarea-routing.module';

import { FormTareaPage } from './form-tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormTareaPageRoutingModule
  ],
  declarations: [FormTareaPage]
})
export class FormTareaPageModule {}
