<?php
error_reporting(0);
require_once('../models/blogs_usuarios.models.php');
$BlogUsuario = new BlogUsuario;

switch ($_GET["op"]) {
        /*TODO: Procedimiento para listar todos los roles */
    case 'todos-usuarios':
        $blogId = $_POST["blogId"];
        $datos = array();
        $datos = $BlogUsuario->todosUsuarios($blogId);
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        /*TODO: Procedimiento para sacar un rol */

    // case "unoconRolID":
    //     $RolID = $_POST["RolID"];
    //     $datos = array();
    //     $datos = $Roles->unoconRolID($RolID);
    //     $res = mysqli_fetch_assoc($datos);
    //     echo json_encode($res);
    //     break;
    // case "unoconNombre_Rol":
    //     $Nombre_Rol = $_POST["Nombre_Rol"];
    //     $datos = array();
    //     $datos = $Roles->unoconNombre_Rol($Nombre_Rol);
    //     $res = mysqli_fetch_assoc($datos);
    //     echo json_encode($res);
    //     break;
        /*TODO: Procedimiento para insertar */
    case 'insertar':
        $blogId = $_POST["blogId"];
        $usuarioId = $_POST["usuarioId"];
        $datos = array();
        $datos = $BlogUsuario->insertar($blogId,$usuarioId);
        echo json_encode($datos);
    break;
        /*TODO: Procedimiento para actualizar */
    case 'actualizar':
        $RolID = $_POST["RolID"];
        $UsuarioID = $_POST["UsuarioID"];
        $RolUsuarioRelacionID = $_POST['RolUsuarioRelacionID'];
        $datos = array();
        $datos = $Usuario_Roles->Actualizar($RolID, $UsuarioID, $RolUsuarioRelacionID);
        echo json_encode($datos);
        break;
        /*TODO: Procedimiento para eliminar */
    case 'eliminar':
        $RolUsuarioRelacionID = $_POST["RolUsuarioRelacionID"];
        $datos = array();
        $datos = $Usuario_Roles->Eliminar($RolUsuarioRelacionID);
        echo json_encode($datos);
        break;
     
}
