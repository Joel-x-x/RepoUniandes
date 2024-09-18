<?php
require_once('../config/config.php');
require_once('../config/cors.php');
require_once('../model/clientes.model.php');
error_reporting(0);

$clientes = new Clientes();

switch ($_GET['op']) {
  case 'todos':
    $datos = $clientes->todos();
    echo json_encode($datos);
    break;
  case 'uno':
    $id = $_POST['id'];

    $datos = $clientes->uno($id);
    echo json_encode($datos);
    break;
  case 'insertar':
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];

    $datos = $clientes->insertar($nombre, $apellido, $email, $telefono);
    echo json_encode($datos);
    break;
  case 'actualizar':
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];

    $datos = $clientes->actualizar($id, $nombre, $apellido, $email, $telefono);
    echo json_decode($datos);
  case 'eliminar':
    $id = $_POST['id'];

    $datos = $clientes->eliminar($id);
    echo json_encode($datos);
    break;
  default:
    echo "Not Found";
    break;
}
