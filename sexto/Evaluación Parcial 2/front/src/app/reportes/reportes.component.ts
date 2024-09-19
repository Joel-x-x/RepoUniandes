import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  standalone: true,  // Esto indica que el componente es standalone
  imports: [CommonModule, ReactiveFormsModule],  // Importar módulos necesarios
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  frm_Reporte: FormGroup;

  constructor(private fb: FormBuilder) {
    this.frm_Reporte = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  grabar(): void {
    if (this.frm_Reporte.valid) {
      const reporteData = this.frm_Reporte.value;
      console.log('Datos del reporte:', reporteData);
      // Llama al servicio para enviar los datos del formulario.
    } else {
      console.error('Formulario inválido');
    }
  }
}
