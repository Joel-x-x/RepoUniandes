<?php
require_once('../config/config.php');
require_once('../config/cors.php');
require_once('../model/reportes.model.php');
error_reporting(0);

$reportes = new Reportes();

switch ($_GET['op']) {
  case 'reporte':
    $inicio = $_POST['inicio'];
    $fin = $_POST['fin'];
    $datos = $reportes->reporteOrdenesGeneradas($inicio, $fin);
    echo json_encode($datos);
    break;
  default:
    echo "Not Found";
    break;
}
