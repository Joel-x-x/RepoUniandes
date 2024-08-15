<?php

require_once('../config/config.php');

class Cursos
{
    //TODO: Implementar los metodos de la clase

    public function todos() //select * from cursos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cursos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($id) //select * from cursos where id = $id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cursos` WHERE `curso_id`=$id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $descripcion, $fechaInicio, $fechaFin) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `cursos` ( `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`) VALUES ('$nombre','$descripcion','$fechaInicio','$fechaFin')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($id, $nombre, $descripcion, $fechaInicio, $fechaFin) //update cursos
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `cursos` SET `nombre`='$nombre',`descripcion`='$descripcion',`fecha_inicio`='$fechaInicio',`fecha_fin`='$fechaFin' WHERE `curso_id` = $id";
            if (mysqli_query($con, $cadena)) {
                return $id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($id) //delete from cursos where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `cursos` WHERE `curso_id`= $id";
            // echo $cadena;
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
