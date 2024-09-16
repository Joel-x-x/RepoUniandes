<?php
require('./fpdf/fpdf.php');

class PDF extends FPDF
{
    // Cabecera de página
    function Header()
    {
        // Información de la empresa
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 6, 'Empresa XYZ', 0, 1, 'L');  // Nombre de la empresa
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 6, 'RUC: 1234567890', 0, 1, 'L');  // RUC
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Dirección: Calle Falsa 123, Quito, Ecuador') , 0, 1, 'L');  // Dirección
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Teléfono: +593 999 999 999') , 0, 1, 'L');  // Teléfono
        $this->Cell(0, 6, 'Email: info@empresa.com', 0, 1, 'L');  // Email
        $this->Ln(5); // Espacio en blanco

        // Datos de la factura
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 6, 'Factura', 0, 1, 'R');  // Título de la factura
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 6, 'No. 001-001-000000001', 0, 1, 'R');  // Número de la factura
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Fecha de Emisión: ') . date('Y-m-d'), 0, 1, 'R');  // Fecha de emisión
        $this->Ln(10); // Espacio en blanco

        // Datos del cliente
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 6, 'Datos del Cliente', 0, 1, 'L');  // Encabezado de cliente
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Nombre: Juan Pérez') , 0, 1, 'L');  // Nombre del cliente
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Cédula/RUC: 1234567890') , 0, 1, 'L');  // Cédula o RUC
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Dirección: Calle Ejemplo 456, Guayaquil, Ecuador') , 0, 1, 'L');  // Dirección
        $this->Cell(0, 6, iconv('UTF-8', 'windows-1252', 'Teléfono: +593 987 654 321') , 0, 1, 'L');  // Teléfono
        $this->Ln(10); // Salto de línea
    }

    // Pie de página
    function Footer() {
        // Posición: a 1,5 cm del final
        $this->SetY(-60); // Mover el pie de página hacia arriba

        // Calcular totales
        global $sub_total, $total_iva, $total_a_pagar;

        // Subtotal
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 6, 'Subtotal: $' . number_format($sub_total, 2), 0, 1, 'R');

        // SUB TOTAL IVA
        $this->Cell(0, 6, 'SUB TOTAL IVA (15%): $' . number_format($sub_total * 0.15, 2), 0, 1, 'R');
        
        // IVA (15%)
        $this->Cell(0, 6, 'IVA (15%): $' . number_format($total_iva, 2), 0, 1, 'R');
        
        // Total a Pagar
        $this->SetFont('Arial', 'B', 12);
        $this->Cell(0, 6, 'Total a Pagar: $' . number_format($total_a_pagar, 2), 0, 1, 'R');

        // Espacio
        $this->Ln(5);

        // Información de la forma de pago
        $this->SetFont('Arial', '', 10);
        $this->Cell(0, 6, 'Forma de pago: Transferencia Bancaria', 0, 1, 'L');
        $this->Cell(0, 6, 'Cuenta Bancaria: Banco Pichincha, Cta: 123456789', 0, 1, 'L');

        // Nota
        $this->Ln(5); // Espacio en blanco
        $this->Cell(0, 6, 'Nota: Gracias por su compra.', 0, 1, 'C');
    }

    // Tabla de productos
    function ProductosTable($header, $data) {
        // Cabecera
        $this->SetFont('Arial', 'B', 12);
        foreach ($header as $col) {
            $this->Cell(32, 7, $col, 1);
        }
        $this->Ln();

        // Datos
        $this->SetFont('Arial', '', 12);
        foreach ($data as $row) {
            foreach ($row as $col) {
                $this->Cell(32, 7, $col, 1);
            }
            $this->Ln();
        }
    }
}

// Crear PDF
$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

// Datos simulados (productos seleccionados)
$productos = [
    ['Descripcion' => 'Producto 1', 'Cantidad' => 2, 'Precio' => 1000, 'Subtotal' => 2000, 'IVA' => 12, 'Total' => 2000],
    ['Descripcion' => 'Producto 2', 'Cantidad' => 2, 'Precio' => 1000, 'Subtotal' => 2000, 'IVA' => 12, 'Total' => 2000],
    ['Descripcion' => 'Producto 3', 'Cantidad' => 2, 'Precio' => 1000, 'Subtotal' => 2000, 'IVA' => 12, 'Total' => 2000]
];

// Cálculo de totales (esto depende de la lógica de tu aplicación)
$sub_total = 6000;
$valor_iva = 15; // Cambiar a 15%
$total_iva = ($sub_total * $valor_iva) / 100;
$total_a_pagar = $sub_total + $total_iva;

// Detalles de la factura
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(0, 10, 'Detalles de la Factura:', 0, 1);
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 10, 'Fecha: ' . date('Y-m-d'), 0, 1);
$pdf->Cell(0, 10, 'Sub-total: $' . number_format($sub_total, 2), 0, 1);
$pdf->Cell(0, 10, 'IVA (' . $valor_iva . '%): $' . number_format($total_iva, 2), 0, 1);
$pdf->Cell(0, 10, 'Total a Pagar: $' . number_format($total_a_pagar, 2), 0, 1);
$pdf->Ln(10);

// Encabezados de la tabla
$header = ['Descripcion', 'Cantidad', 'Precio', 'Subtotal', 'IVA', 'Total'];

// Llamar a la función para crear la tabla
$pdf->ProductosTable($header, $productos);

// Guardar el archivo PDF
$pdf->Output('I', 'factura.pdf');
?>
