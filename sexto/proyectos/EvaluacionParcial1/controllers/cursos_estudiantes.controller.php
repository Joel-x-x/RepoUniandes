<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/cursos_estudiantes.model.php');
error_reporting(0);
$cursos_estudiantes = new CursosEstudiantes;

switch ($_GET['op']) {
    case 'todos':
        $datos = $cursos_estudiantes->todos();
        $result = [];
        while ($row = mysqli_fetch_assoc($datos)) {
            $result[] = $row;
        }
        echo json_encode($result);
        break;

    case 'insertar':
        $curso_id = $_POST["curso_id"];
        $alumno_id = $_POST["alumno_id"];
        $datos = $cursos_estudiantes->insertar($curso_id, $alumno_id);
        echo json_encode($datos);
        break;

    case 'eliminar':
        $curso_id = $_POST["curso_id"];
        $alumno_id = $_POST["alumno_id"];
        $datos = $cursos_estudiantes->eliminar($curso_id, $alumno_id);
        echo json_encode($datos);
        break;
}
?>
