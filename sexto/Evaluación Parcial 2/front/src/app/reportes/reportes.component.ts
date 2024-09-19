import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../Services/reportes.service';
import { IReporte, IReporteResponse } from '../Interfaces/ireporte';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reportes',
  standalone: true,  // Esto indica que el componente es standalone
  imports: [CommonModule, ReactiveFormsModule],  // Importar módulos necesarios
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  frm_Reporte: FormGroup;

  constructor(private fb: FormBuilder, private reportesService: ReportesService) {
    this.frm_Reporte = this.fb.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  grabar(): void {
    if (this.frm_Reporte.valid) {
      const reporte: IReporte = {
        inicio: this.frm_Reporte.value.inicio,
        fin: this.frm_Reporte.value.fin
      }
      
      this.reportesService.todos(reporte).subscribe(data => {
        const reportes: IReporteResponse[] = data;
        this.generarReportePDF(reportes);
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  // Método para generar el reporte en PDF
  generarReportePDF(datos: IReporteResponse[]): void {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(18);
    doc.text('Reporte de Ordenes Generadas', 14, 20);

    doc.setFontSize(14);
    doc.text(`Periodo: ${this.frm_Reporte.value.inicio} ${this.frm_Reporte.value.fin}`, 14, 35);

    // Encabezados de la tabla
    const headers = ['# Orden', 'Fecha', 'Total', 'Nombre', 'Apellido'];
    const startY = 50;
    const rowHeight = 10;
    let y = startY;

    // Dibujar encabezados
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
      doc.text(header, 14 + (index * 40), y);
    });
    
    y += rowHeight; // Espacio debajo del encabezado

    // Dibujar filas
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    datos.forEach(dato => {
      const rowData = [
        `000${dato.id}`, // Agregar tres ceros al final del ID
        dato.fecha,
        Number(dato.total).toFixed(2), // Convertir total a número y mostrar con dos decimales
        dato.nombre,
        dato.apellido
      ];

      rowData.forEach((data, index) => {
        doc.text(data, 14 + (index * 40), y);
      });

      y += rowHeight; // Espacio debajo de cada fila
    });

    // Guardar el PDF
    doc.save('reporte_ordenes.pdf');
  }
}
