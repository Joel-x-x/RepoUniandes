<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de cliente Tienda Cel@g

require_once('../models/cliente.model.php');
error_reporting(0);
$cliente = new Cliente; // Assuming $dbConnection is the required argument

switch ($_GET["op"]) {
    case 'todos': // Procedimiento para cargar todos los datos de los cliente
        $datos = array();
        $datos = $cliente->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    // case 'uno': // Procedimiento para obtener un registro de la base de datos
    //     if (!isset($_POST["idcliente"])) {
    //         echo json_encode(["error" => "Client ID not specified."]);
    //         exit();
    //     }
    //     $idcliente = intval($_POST["idcliente"]);
    //     $datos = array();
    //     $datos = $cliente->uno($idcliente);
    //     $res = mysqli_fetch_assoc($datos);
    //     echo json_encode($res);
    //     break;

    case 'insertar': // Procedimiento para insertar un cliente en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["ci"])) {
            echo json_encode(["error" => "Parametros son requeridos."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $ci = $_POST["ci"];

        $datos = array();
        $datos = $cliente->insertar($nombre, $ci);
        echo json_encode($datos);
        break;

    // case 'actualizar': // Procedimiento para actualizar un cliente en la base de datos
    //     if (!isset($_POST["idcliente"]) || !isset($_POST["Nombres"]) || !isset($_POST["Direccion"]) || !isset($_POST["Telefono"]) || !isset($_POST["Cedula"]) || !isset($_POST["Correo"])) {
    //         echo json_encode(["error" => "Missing required parameters."]);
    //         exit();
    //     }

    //     $idcliente = intval($_POST["idcliente"]);
    //     $Nombres = $_POST["Nombres"];
    //     $Direccion = $_POST["Direccion"];
    //     $Telefono = $_POST["Telefono"];
    //     $Cedula = $_POST["Cedula"];
    //     $Correo = $_POST["Correo"];

    //     $datos = array();
    //     $datos = $cliente->actualizar($idcliente, $Nombres, $Direccion, $Telefono, $Cedula, $Correo);
    //     echo json_encode($datos);
    //     break;

    // case 'eliminar': // Procedimiento para eliminar un cliente en la base de datos
    //     if (!isset($_POST["idcliente"])) {
    //         echo json_encode(["error" => "Client ID not specified."]);
    //         exit();
    //     }
    //     $idcliente = intval($_POST["idcliente"]);
    //     $datos = array();
    //     $datos = $cliente->eliminar($idcliente);
    //     echo json_encode($datos);
    //     break;

    default:
        echo json_encode(["error" => "Operación invalida."]);
        break;
}
