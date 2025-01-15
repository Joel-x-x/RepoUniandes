<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de login Tienda Cel@g

require_once('../models/login.model.php');
error_reporting(0);
$login = new Login; // Assuming $dbConnection is the required argument

switch ($_GET["op"]) {
    case 'login': 
        $usuario = $_POST['usuario']; 
        $password = $_POST['password']; 
        
        $loginResult = $login->login($usuario, $password);
        
        if ($loginResult) {
            echo json_encode(true); 
        } else {
            echo json_encode(false);
        }
        break;
    

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
