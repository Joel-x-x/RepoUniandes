<?php
// TODO: Clase de carros Tienda Cel@g
require_once('../config/config.php');

class Carro {
    public function todos() // select * from carros
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `carros`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($placa, $marca) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `carros`(`placa`, `marca`) 
                       VALUES ('$placa', '$marca')";
            if (mysqli_query($con, $cadena)) {
                return true; // Return the inserted ID
            } else {
                return false;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function __construct() {}
}
