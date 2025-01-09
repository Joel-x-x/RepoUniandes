<?php


//importar archivo de conexión
require_once('../config/conexion.php');

class Clase_Usuarios
{

    public function todos()
    {

        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT Usuarios.*, Roles.Detalle as rol FROM `Usuarios` INNER JOIN Roles on Usuarios.Rolid = Roles.Rolid;";
        $resultado = mysqli_query($con, $cadena);
        return $resultado;
    }
    public function uno($UsuarioId)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT Usuarios.*, Roles.Detalle as rol FROM `Usuarios` INNER JOIN Roles on Usuarios.Rolid = Roles.Rolid where UsuarioId=$UsuarioId";
            $resultado = mysqli_query($con, $cadena);
            return $resultado;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function insertar($Nombres, $Apellidos, $Correo, $Password, $Rolid)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO `Usuarios`(`Nombres`, `Apellidos`, `Correo`, `Password`, `Rolid`) VALUES ('$Nombres','$Apellidos', '$Correo','$Password','$Rolid')";
            $resultado = mysqli_query($con, $cadena);
            return $resultado;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($UsuarioId, $Nombres, $Apellidos, $Correo, $Password, $Rolid)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE `Usuarios` SET `Nombres`='$Nombres',`Apellidos`='$Apellidos',`Correo`='$Correo',`Password`='$Password',`Rolid`='$Rolid' WHERE `UsuarioId`=$UsuarioId";
            $resultado = mysqli_query($con, $cadena);
            return $resultado;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($UsuarioId)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM `Usuarios` WHERE `UsuarioId`=$UsuarioId";
            $resultado = mysqli_query($con, $cadena);
            return $resultado;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function login($Correo, $Password)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT Usuarios.*, Roles.Detalle as rol FROM `Usuarios` INNER JOIN Roles on Usuarios.Rolid = Roles.Rolid where `Correo` ='$Correo' and `Password`='$Password'";
            $resultado = mysqli_query($con, $cadena);
            return $resultado;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function verfica_correo($Correo)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT count(*) FROM `Usuarios` where `Correo` ='$Correo' ";
            $resultado = mysqli_query($con, $cadena);
            return $resultado;
        } catch (Throwable $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
