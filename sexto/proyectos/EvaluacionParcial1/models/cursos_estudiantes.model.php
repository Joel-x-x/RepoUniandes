<?php

require_once('../config/config.php');

class CursosEstudiantes
{
    public function todos() // select * from cursos_estudiantes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `cursos_estudiantes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($curso_id, $alumno_id) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `cursos_estudiantes` (`curso_id`, `alumno_id`) VALUES ($curso_id, $alumno_id)";
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

    public function eliminar($curso_id, $alumno_id) // delete from cursos_estudiantes where curso_id = $curso_id and alumno_id = $alumno_id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `cursos_estudiantes` WHERE `curso_id` = $curso_id AND `alumno_id` = $alumno_id";
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
?>
