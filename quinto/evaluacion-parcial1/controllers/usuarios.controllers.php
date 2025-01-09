<?php

error_reporting(0);
require_once('../config/sesiones.php');
require_once('../models/usuarios.models.php');
$Usuarios = new Usuarios;

switch ($_GET['op']) {
    case 'todos':
        $datos = array();
        $datos = $Usuarios->todos();
        while($row = mysqli_fetch_assoc($datos)){
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'todos-autores':
        $datos = array();
        $datos = $Usuarios->todosAutores();
        while($row = mysqli_fetch_assoc($datos)){
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'uno':
        $UserID = $_POST['UserID'];
        $datos = $array();
        $datos = $Usuarios->uno($UserID);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
    case 'insertar-autor':
        //$UserID = $_POST['UserID'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];
        $clave = $_POST['clave'];
        $nacionalidad = $_POST['nacionalidad'];
        $nacimiento = $_POST['nacimiento'];
        $genero = $_POST['genero'];
        $rolId = $_POST['rol'];
        $datos = array();
        $datos = $Usuarios->insertarAutor($nombre, $apellido, $email, $clave, $nacionalidad, $nacimiento, $genero, $rolId);
        echo json_encode($datos);
        break;
    case 'insertar':
            //$UserID = $_POST['UserID'];
            $nombre = $_POST['nombre'];
            $email = $_POST['email'];
            $clave = $_POST['clave'];
            $rolId = $_POST['rol'];
            $datos = array();
            $datos = $Usuarios->insertar($nombre, $email, $clave, $rolId);
            echo json_encode($datos);
        break;
    // case 'actualizar':
    //     $UserID = $_POST['UserID'];
    //     $Nombre = $_POST['Nombre'];
    //     $CorreoElectronico = $_POST['CorreoElectronico'];
    //     $Clave = $_POST['Clave'];
    //     $RolID = $_POST['RolID'];
    //     $datos = $array();
    //     $datos = $Usuarios->actualizar($UserID, $Nombre, $CorreoElectronico, $Clave, $RolID);
    //     echo json_encode($datos);
    //     break;
    case 'eliminar':
        $UserID = $_POST['UserID'];
        $datos = $array();
        $datos = $Usuarios->eliminar($UserID);
        echo json_encode($datos);
        break;
        case 'login':
            // header("Location:../views/home.php");
            // return;
            $email = $_POST['email'];
            $clave = $_POST['clave'];
            //TODO: Si las variables estab vacias rgersa con error
            if (empty($email) or empty($clave)) {
                header("Location:../login.php?op=2");
                exit();
            }
            try {
                $datos = array();
                $datos = $Usuarios->login($email, $clave);
                $res = mysqli_fetch_assoc($datos);
            } catch (Throwable $th) {
                header("Location:../login.php?op=1");
                exit();
            }
            //TODO:Control de si existe el registro en la base de datos
            try {
                if (is_array($res) and count($res) > 0) {
                    //if ((md5($clave) == ($res["clave"]))) {
                        // header("Location:../views/home.php");
                    if ((($clave) == ($res["clave"]))) {
                        //$datos2 = array();
                        // $datos2 = $Accesos->Insertar(date("Y-m-d H:i:s"), $res["idUsuarios"], 'ingreso');
    
                        $_SESSION["idUsuarios"] = $res["id"];
                        $_SESSION["Usuarios_Nombres"] = $res["nombre"];
                        $_SESSION["Usuarios_Correo"] = $res["email"];
                        $_SESSION["Usuario_IdRoles"] = $res["r.id"];
                        $_SESSION["Rol"] = $res["rol"];
    
                        header("Location:../views/home.php");
                        exit();
                    } else {
                        header("Location:../login.php?op=1");
                        exit();
                    }
                } else {
                    header("Location:../login.php?op=1");
                    exit();
                }
            } catch (Exception $th) {
                echo ($th->getMessage());
            }
            break;    
}

?>