<?php
require_once('../config/config.php');
require_once('../config/cors.php');
require_once('../model/ordenes.model.php');
error_reporting(0);

$ordenes = new Ordenes();

switch ($_GET['op']) {
  case 'todos':
    $datos = $ordenes->todos();
    echo json_encode($datos);
    break;
  case 'uno':
    $id = $_POST['id'];

    $datos = $ordenes->uno($id);
    echo json_encode($datos);
    break;
  case 'insertar':
    $cliente_id = $_POST['cliente_id'];
    $menu_id = $_POST['menu_id'];
    $total = $_POST['total'];
    $fecha = $_POST['fecha'];

    $datos = $ordenes->insertar($cliente_id, $menu_id, $total, $fecha);
    echo json_encode($datos);
    break;
  case 'actualizar':
    $id = $_POST['id'];
    $cliente_id = $_POST['cliente_id'];
    $menu_id = $_POST['menu_id'];
    $total = $_POST['total'];
    $fecha = $_POST['fecha'];

    $datos = $ordenes->actualizar($id, $cliente_id, $menu_id, $total, $fecha);
    echo json_encode($datos);
    break;
  case 'actualizar-total': 
    $id = $_POST['id'];

    $datos = $ordenes->actualizarTotal($id);
    echo json_encode($datos);
    break;
}
?>
