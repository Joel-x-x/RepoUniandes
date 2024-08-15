<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/estudiantes.model.php');
error_reporting(0);
$estudiantes = new Estudiantes;

switch ($_GET['op']) {
    case 'todos':
        $datos = $estudiantes->todos();
        $result = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $result[] = $row;
        }
        echo json_encode($result);
        break;

    case 'uno':
        $id = $_POST["id"];
        $datos = $estudiantes->uno($id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar':
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fechaNacimiento = $_POST["fecha_nacimiento"];
        $datos = $estudiantes->insertar($nombre, $apellido, $fechaNacimiento);
        echo json_encode($datos);
        break;

    case 'actualizar':
        $id = $_POST["id"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $fechaNacimiento = $_POST["fecha_nacimiento"];
        $datos = $estudiantes->actualizar($id, $nombre, $apellido, $fechaNacimiento);
        echo json_encode($datos);
        break;

    case 'eliminar':
        $id = $_POST["id"];
        $datos = $estudiantes->eliminar($id);
        echo json_encode($datos);
        break;
}
?>
