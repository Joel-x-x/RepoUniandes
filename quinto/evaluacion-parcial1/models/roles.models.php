<?php

require_once ('../config/conexion.php');

class Roles {
    //Procedimiento para obtener todos los roles
    public function todos(){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM roles where nombre <> 'AUTOR'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }

    public function autor(){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "select * from roles where nombre = 'AUTOR'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
  
    //Procedimiento para insertar un rol
    public function insertar($Nombre_Rol){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "INSERT INTO roles(Nombre_Rol) VALUES('$Nombre_Rol')";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    //Procedimiento para actualizar un rol
    public function actualizar($Nombre_Rol){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "UPDATE roles SET Nombre_Rol = '$Nombre_Rol'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    //Procedimiento para eliminar un rol
    public function eliminar($RolID){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "DELETE FROM roles WHERE RolID = '$RolID'";
        $datos = mysqli_query($con, $cadena);
        if($datos){
            return true;
        }else{
            return false;
        }
    
    }
    

}

?>