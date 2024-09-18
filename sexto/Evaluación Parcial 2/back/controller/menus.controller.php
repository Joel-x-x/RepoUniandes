<?php
require_once('../config/config.php');
require_once('../config/cors.php');
require_once('../model/menus.model.php');
error_reporting(0);

$menus = new Menus();

switch ($_GET['op']) {
  case 'todos':
    $datos = $menus->todos();
    echo json_encode($datos);
    break;
  case 'uno':
    $id = $_POST['id'];

    $datos = $menus->uno($id);
    echo json_encode($datos);
    break;
  case 'insertar':
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $disponible = $_POST['disponible'];

    $datos = $menus->insertar($nombre, $descripcion, $precio, $disponible);
    echo json_encode($datos);
    break;
  case 'actualizar':
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $precio = $_POST['precio'];
    $disponible = $_POST['disponible'];

    $datos = $menus->actualizar($id, $nombre, $descripcion, $precio, $disponible);
    echo json_encode($datos);
    break;
}
?>
