<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de cursos

require_once('../models/cursos.model.php');
error_reporting(0);
$cursos = new Cursos;

switch ($_GET['op']) {
        //TODO: operaciones de cursos

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los cursos
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase cursos.model.php
        $datos = $cursos->todos(); // Llamo al metodo todos de la clase cursos.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $id = $_POST["id"];
        $datos = array();
        $datos = $cursos->uno($id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un proveedor en la base de datos
    case 'insertar':
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fechaInicio = $_POST["fecha_inicio"];
        $fechaFin = $_POST["fecha_fin"];

        $datos = array();
        $datos = $cursos->insertar($nombre, $descripcion, $fechaInicio, $fechaFin);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualziar un proveedor en la base de datos
    case 'actualizar':
        $id = $_POST["id"];
        $nombre = $_POST["nombre"];
        $descripcion = $_POST["descripcion"];
        $fechaInicio = $_POST["fecha_inicio"];
        $fechaFin = $_POST["fecha_fin"];
        $datos = array();
        $datos = $cursos->actualizar($id, $nombre, $descripcion, $fechaInicio, $fechaFin);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un proveedor en la base de datos
    case 'eliminar':
        $id = $_POST["id"];
        $datos = array();
        $datos = $cursos->eliminar($id);
        echo json_encode($datos);
        break;
}
