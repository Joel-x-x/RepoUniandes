<?php
error_reporting(0);
require_once('../Models/usuarios.model.php');

$usuarios = new Clase_Usuarios;


switch ($_GET['op']) {
    case 'todos':
        $datos = array();
        $datos = $usuarios->todos();
        while ($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;
    case 'uno':
        $UsuarioId = $_POST['UsuarioId'];
        $datos = array();
        $datos = $usuarios->uno($UsuarioId);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;
    case 'insertar':
        $Nombres = $_POST["Nombres"];
        $Apellido = $_POST["Apellido"];
        $Correo = $_POST["Correo"];
        $Password = $_POST["Password"];
        $Rolid = $_POST["Rolid"];

        $datos = array();
        $datos = $usuarios->insertar($Nombres, $Apellido, $Correo, $Password, $Rolid);
        echo json_encode($datos);
        break;

    case 'actualizar':
        $UsuarioId = $_POST['UsuarioId'];
        $Nombres = $_POST["Nombres"];
        $Apellido = $_POST["Apellido"];
        $Correo = $_POST["Correo"];
        $Password = $_POST["Password"];
        $Rolid = $_POST["Rolid"];

        $datos = array();
        $datos = $usuarios->actualizar($UsuarioId, $Nombres, $Apellido, $Correo, $Password, $Rolid);
        echo json_encode($datos);
        break;
    case 'eliminar':
        $UsuarioId = $_POST['UsuarioId'];
        $datos = array();
        $datos = $usuarios->eliminar($UsuarioId);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;
    case 'verfica_correo':
        $Correo = $_POST['Correo'];
        $datos = array();
        $datos = $usuarios->verfica_correo($Correo);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;
    case 'login':
        $Correo = $_POST['Correo'];
        $Password = $_POST["Password"];
        $datos = array();
        $datos = $usuarios->login($Correo, $Password);
        $uno = mysqli_fetch_assoc($datos);
        echo json_encode($uno);
        break;
}
/**
 * 
 * GET    => URL externo
 * POST   => envio de datos por interno
 * 
 * 
 */
