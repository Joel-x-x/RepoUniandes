<?php
// TODO: Clase de parqueaderos Tienda Cel@g
require_once('../config/config.php');

class Parqueadero {
    public function todos() {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
    
        $cadena = "
            SELECT 
                p.id AS id,
                p.ingreso,
                p.egreso,
                p.valor,
                c.id AS cliente_id,
                ca.id AS carro_id,
                ca.placa,
                ca.marca,
                c.ci,
                c.nombre
            FROM 
                parqueaderos p
            LEFT JOIN 
                clientes c ON p.cliente_id = c.id
            LEFT JOIN 
                carros ca ON p.carro_id = ca.id
        ";
    
        // Ejecutar la consulta
        $datos = mysqli_query($con, $cadena);
    
        // Cerrar la conexión
        $con->close();
    
        return $datos;
    }
    

    public function ingreso($ingreso, $carro_id, $cliente_id) {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `parqueaderos`(`ingreso`, `carro_id`, `cliente_id`) 
                       VALUES ('$ingreso', '$carro_id', '$cliente_id')";
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

    public function egreso($id, $egreso, $valor)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `parqueaderos` SET 
                       `egreso`='$egreso', `valor`='$valor' 
                       WHERE `id` = $id";
            if (mysqli_query($con, $cadena)) {
                return true; // Return the updated ID
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
