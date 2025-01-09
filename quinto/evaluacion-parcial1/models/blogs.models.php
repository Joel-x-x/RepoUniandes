<?php

require_once ('../config/conexion.php');

class Blogs {
    //Procedimiento para obtener todos los Blogs
    public function todos(){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "select * from blogs";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    //Procedimiento para obtener un usuario
    public function uno($UserID){

        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT Blogs.UserID, Blogs.Nombre, Blogs.CorreoElectronico, Blogs.Clave, Roles.Nombre_Rol WHERE UserID = '$UserID'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    //Procedimiento para insertar un usuario
    public function insertar($nombre, $tema, $fecha_creacion)
    {   
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "insert into blogs (nombre, tema, fecha_creacion)
        values ('$nombre', '$tema', '$fecha_creacion');";
        if (mysqli_query($con, $cadena)) {
            return 'ok';
        } else {
            return 'Error al insertar en la base de datos';
        }
        $con->close();
    }
    //Procedimiento para actualizar un usuario
    // public function actualizar($UserID, $Nombre, $CorreoElectronico, $clave, $RolID){
    //     $con= new ClaseConectar();
    //     $con = $con->ProcedimientoConectar();
    //     $cadena = "UPDATE Blogs SET Nombre = '$Nombre', CorreoElectronico = '$CorreoElectronico', Clave = '$Clave', RolID = '$RolID' WHERE UserID = '$UserID'";
    //     $datos = mysqli_query($con, $cadena);
    //     return $datos;
    //     $con->close();
    // }
    //Procedimiento para eliminar un usuario
    public function eliminar($UserID){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "DELETE FROM Blogs WHERE UserID = '$UserID'";
        $datos = mysqli_query($con, $cadena);
        if($datos){
            return true;
        }else{
            return false;
        }
    }

}

?>