<?php
require_once('../config/config.php');
require_once('../config/cors.php');
require_once('../model/detalle_ordenes.model.php');
error_reporting(0);

$detalle_ordenes = new DetalleOrdenes();

switch ($_GET['op']) {
  case 'todos':
    $orden_id = $_POST['orden_id'];
    $datos = $detalle_ordenes->todos($orden_id);
    echo json_encode($datos);
    break;
  case 'uno':
    $id = $_POST['id'];

    $datos = $detalle_ordenes->uno($id);
    echo json_encode($datos);
    break;
  case 'insertar':
    $orden_id = $_POST['orden_id'];
    $menu_id = $_POST['menu_id'];
    $precio_unitario = $_POST['precio_unitario'];
    $cantidad = $_POST['cantidad'];
    $total = $_POST['total'];

    $datos = $detalle_ordenes->insertar($orden_id, $menu_id, $precio_unitario, $cantidad, $total);
    echo json_encode($datos);
    break;
  case 'actualizar':
    $id = $_POST['id'];
    $orden_id = $_POST['orden_id'];
    $menu_id = $_POST['menu_id'];
    $precio_unitario = $_POST['precio_unitario'];
    $cantidad = $_POST['cantidad'];
    $total = $_POST['total'];

    $datos = $detalle_ordenes->actualizar($id, $orden_id, $menu_id, $precio_unitario, $cantidad, $total);
    echo json_encode($datos);
    break;
  case 'eliminar':
    $id = $_POST['id'];
    $datos = $detalle_ordenes->eliminar($id);
    echo json_encode($datos);
    break;
  default:
    echo "Not Found";
    break;
}
