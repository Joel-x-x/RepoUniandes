<?php

require_once ('../config/conexion.php');

class Usuarios {
    //Procedimiento para obtener todos los usuarios
    public function todos(){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT u.*, r.nombre as rol FROM usuarios u join roles_usuarios ru on ru.usuario_id = u.id join roles r on r.id = ru.rol_id where r.nombre <> 'AUTOR'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function todosAutores(){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT u.*, r.nombre as rol FROM usuarios u join roles_usuarios ru on ru.usuario_id = u.id join roles r on r.id = ru.rol_id where r.nombre = 'AUTOR'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    //Procedimiento para obtener un usuario
    public function uno($UserID){

        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT Usuarios.UserID, Usuarios.Nombre, Usuarios.CorreoElectronico, Usuarios.Clave, Roles.Nombre_Rol WHERE UserID = '$UserID'";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    //Procedimiento para insertar un usuario
    public function insertar($nombre, $email, $clave, $rolId)
    {   
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "insert into usuarios(nombre,email,clave) values ( '$nombre', '$email', '$clave')";

        if (mysqli_query($con, $cadena)) {
            $t = mysqli_insert_id($con);
            $cadena = "INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES ($rolId, $t)";

            if (mysqli_query($con, $cadena)) {
                return 'ok';
            } else {
                return 'Error al insertar en la base de datos';
            }
        } else {
            return 'Error al insertar en la base de datos';
        }
        $con->close();
    }

    // public function insertarAutor($nombre, $apellido, $email, $clave, $nacionalidad, $nacimiento, $genero, $rolId)
    // {   
    //     $con = new ClaseConectar();
    //     $con = $con->ProcedimientoConectar();
    //     $cadena = "insert into usuarios(nombre, apellido, email, clave, nacionalidad, nacimiento, genero) values ('$nombre', '$apellido', '$email', '$clave', '$nacionalidad', '$nacimiento', '$genero')";

    //     if (mysqli_query($con, $cadena)) {
    //         $t = mysqli_insert_id($con);
    //         $cadena = "INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES ($rolId, $t)";

    //         if (mysqli_query($con, $cadena)) {
    //             return 'ok';
    //         } else {
    //             return 'Error al insertar en la base de datos';
    //         }
    //     } else {
    //         return 'Error al insertar en la base de datos';
    //     }
    //     $con->close();
    // }

    public function insertarAutor($nombre, $apellido, $email, $clave, $nacionalidad, $nacimiento, $genero, $rolId)
    {   
    $con = new ClaseConectar();
    $con = $con->ProcedimientoConectar();
    $cadena = "insert into usuarios(nombre, apellido, email, clave, nacionalidad, nacimiento, genero) values ('$nombre', '$apellido', '$email', '$clave', '$nacionalidad', '$nacimiento', '$genero')";

    if (mysqli_query($con, $cadena)) {
        $t = mysqli_insert_id($con);
        $cadena = "INSERT INTO roles_usuarios (rol_id, usuario_id) VALUES ($rolId, $t)";

        if (mysqli_query($con, $cadena)) {
            return 'ok';
        } else {
            return 'Error al insertar en la base de datos';
        }
    } else {
        return 'Error al insertar en la base de datos';
    }
    $con->close(); // Mover fuera de los bloques condicionales
    }

    //Procedimiento para actualizar un usuario
    // public function actualizar($UserID, $Nombre, $CorreoElectronico, $clave, $RolID){
    //     $con= new ClaseConectar();
    //     $con = $con->ProcedimientoConectar();
    //     $cadena = "UPDATE Usuarios SET Nombre = '$Nombre', CorreoElectronico = '$CorreoElectronico', Clave = '$Clave', RolID = '$RolID' WHERE UserID = '$UserID'";
    //     $datos = mysqli_query($con, $cadena);
    //     return $datos;
    //     $con->close();
    // }
    //Procedimiento para eliminar un usuario
    public function eliminar($UserID){
        $con= new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "DELETE FROM Usuarios WHERE UserID = '$UserID'";
        $datos = mysqli_query($con, $cadena);
        if($datos){
            return true;
        }else{
            return false;
        }
    
    }
    public function login($email)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "SELECT u.*, r.nombre as rol from usuarios u INNER JOIN roles_usuarios ru on ru.usuario_id = u.id INNER JOIN roles r ON r.id = ru.rol_id WHERE u.email = '$email'";
            $datos = mysqli_query($con, $cadena);
            return $datos;
        } catch (Throwable $th) {
            return $th->getMessage();
        }
        $con->close();
    }
    

}

?>