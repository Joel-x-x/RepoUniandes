<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de carro Tienda Cel@g

require_once('../models/carro.model.php');
error_reporting(0);
$carro = new Carro; // Assuming $dbConnection is the required argument

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todos los datos de los carro
        $datos = array();
        $datos = $carro->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'insertar': // Procedimiento para insertar un carro en la base de datos
        if (!isset($_POST["placa"]) || !isset($_POST["marca"])) {
            echo json_encode(["error" => "Parametros son requeridos."]);
            exit();
        }

        $placa = $_POST["placa"];
        $marca = $_POST["marca"];

        $datos = array();
        $datos = $carro->insertar($placa, $marca);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Operación invalida."]);
        break;
}
