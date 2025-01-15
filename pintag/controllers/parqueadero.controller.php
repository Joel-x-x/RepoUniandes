<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de parqueadero Tienda Cel@g

require_once('../models/parqueadero.model.php');
error_reporting(0);
$parqueadero = new Parqueadero; // Assuming $dbConnection is the required argument

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todos los datos de los parqueadero
        $datos = array();
        $datos = $parqueadero->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'ingreso': 
        if (!isset($_POST["ingreso"]) || !isset($_POST["carro_id"]) || !isset($_POST["cliente_id"])) {
            echo json_encode(["error" => "Parametros son requeridos."]);
            exit();
        }

        $ingreso = $_POST["ingreso"];
        $carro_id = $_POST["carro_id"];
        $cliente_id = $_POST["cliente_id"];

        $datos = array();
        $datos = $parqueadero->ingreso($ingreso, $carro_id, $cliente_id);
        echo json_encode($datos);
        break;

    case 'egreso': 
        if (!isset($_POST["id"]) || !isset($_POST["egreso"]) || !isset($_POST["valor"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $id = intval($_POST["id"]);
        $egreso = $_POST["egreso"];
        $valor = $_POST["valor"];

        $datos = array();
        $datos = $parqueadero->egreso($id, $egreso, $valor);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Operación invalida."]);
        break;
}
