<?php

error_reporting(0);
require_once('../config/sesiones.php');
require_once('../models/blogs.models.php');
$Blogs = new Blogs;

switch ($_GET['op']) {
    case 'todos':
        $datos = array();
        $datos = $Blogs->todos();
        while($row = mysqli_fetch_assoc($datos)){
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
    case 'uno':
        $UserID = $_POST['UserID'];
        $datos = $array();
        $datos = $Blogs->uno($UserID);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
    case 'insertar':
            $nombre = $_POST['nombre'];
            $tema = $_POST['tema'];
            $visitas = $_POST['visitas'];
            $fechaCreacion = $_POST['fecha_creacion'];
            $datos = array();
            $datos = $Blogs->insertar($nombre, $tema, $visitas, $fechaCreacion);
            echo json_encode($datos);
        break;
    // case 'actualizar':
    //     $UserID = $_POST['UserID'];
    //     $Nombre = $_POST['Nombre'];
    //     $CorreoElectronico = $_POST['CorreoElectronico'];
    //     $Clave = $_POST['Clave'];
    //     $RolID = $_POST['RolID'];
    //     $datos = $array();
    //     $datos = $Blogs->actualizar($UserID, $Nombre, $CorreoElectronico, $Clave, $RolID);
    //     echo json_encode($datos);
    //     break;
    case 'eliminar':
        $UserID = $_POST['UserID'];
        $datos = $array();
        $datos = $Blogs->eliminar($UserID);
        echo json_encode($datos);
        break;
}

?>