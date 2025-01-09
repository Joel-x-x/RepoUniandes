<?php
error_reporting(0);
require_once('../models/roles.models.php');
$Roles = new Roles;

switch ($_GET["op"]) {
        /*TODO: Procedimiento para listar todos los roles */
    case 'todos':
        $datos = array();
        $datos = $Roles->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'autor':
        $datos = array();
        $datos = $Roles->autor();
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        /*TODO: Procedimiento para sacar un rol */
    case 'insertar':
    
        $Nombre_Rol = $_POST["Nombre_Rol"];
        $datos = array();
        $datos = $Roles->insertar($Nombre_Rol);
        echo json_encode($datos);
        break;
        /*TODO: Procedimiento para actualizar */
    case 'actualizar':
        $RolID = $_POST["RolID"];
        $Nombre_Rol = $_POST["Nombre_Rol"];
        $datos = array();
        $datos = $Roles->Actualizar($RolID, $Nombre_Rol);
        echo json_encode($datos);
        break;
        /*TODO: Procedimiento para eliminar */
    case 'eliminar':
        $RolID = $_POST["RolID"];
        $datos = array();
        $datos = $Roles->Eliminar($RolID);
        echo json_encode($datos);
        break;
        /*TODO: Procedimiento para insertar */
    case 'login':
        $CorreoElectronico = $_POST['CorreoElectronico'];
        $contrasenia = $_POST['contrasenia'];

        //TODO: Si las variables estab vacias regresa con error
        if (empty($correo) or  empty($contrasenia)) {
            header("Location:../login.php?op=2");
            exit();
        }

        try {
            $datos = array();
            $datos = $Usuarios->login($correo, $contrasenia);
            $res = mysqli_fetch_assoc($datos);
        } catch (Throwable $th) {
            header("Location:../login.php?op=1");
            exit();
        }
        //TODO:Control de si existe el registro en la base de datos
        try {
            if (is_array($res) and count($res) > 0) {
                //if ((md5($contrasenia) == ($res["Contrasenia"]))) {
                if ((($contrasenia) == ($res["Contrasenia"]))) {
                    //$datos2 = array();
                    // $datos2 = $Accesos->Insertar(date("Y-m-d H:i:s"), $res["idUsuarios"], 'ingreso');

                    $_SESSION["idUsuarios"] = $res["idUsuarios"];
                    $_SESSION["Usuarios_Nombres"] = $res["Nombres"];
                    $_SESSION["Usuarios_Apellidos"] = $res["Apellidos"];
                    $_SESSION["Usuarios_Correo"] = $res["Correo"];
                    $_SESSION["Usuario_IdRoles"] = $res["idRoles"];
                    $_SESSION["Rol"] = $res["Rol"];



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
