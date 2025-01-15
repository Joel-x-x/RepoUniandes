<?php
// TODO: Clase de Clientes Tienda Cel@g
require_once('../config/config.php');

class Cliente {
    // TODO: Implementar los métodos de la clase


    // public function buscar($textp) // select * from clientes
    // {
    //     $con = new ClaseConectar();
    //     $con = $con->ProcedimientoParaConectar();
    //     $cadena = "SELECT * FROM `clientes` where nombres='$textp'";
    //     $datos = mysqli_query($con, $cadena);
    //     $con->close();
    //     return $datos;
    // }
    public function todos() // select * from clientes
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `clientes`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    // public function uno($idClientes) // select * from clientes where id = $idClientes
    // {
    //     $con = new ClaseConectar();
    //     $con = $con->ProcedimientoParaConectar();
    //     $cadena = "SELECT * FROM `clientes` WHERE `idClientes` = $idClientes";
    //     $datos = mysqli_query($con, $cadena);
    //     $con->close();
    //     return $datos;
    // }

    public function insertar($nombre, $ci) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `clientes`(`nombre`, `ci`) 
                       VALUES ('$nombre', '$ci')";
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

    // public function actualizar($id, $nombre, $ci) // update clientes set nombres = $nombres, direccion = $direccion, telefono = $telefono, cedula = $cedula, correo = $correo where id = $idClientes
    // {
    //     try {
    //         $con = new ClaseConectar();
    //         $con = $con->ProcedimientoParaConectar();
    //         $cadena = "UPDATE `clientes` SET 
    //                    `nombre`='$nombre',
    //                    `ci`='$ci' 
    //                    WHERE `id` = $id";
    //         if (mysqli_query($con, $cadena)) {
    //             return $id; // Return the updated ID
    //         } else {
    //             return $con->error;
    //         }
    //     } catch (Exception $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }

    // public function eliminar($idClientes) // delete from clientes where id = $idClientes
    // {
    //     try {
    //         $con = new ClaseConectar();
    //         $con = $con->ProcedimientoParaConectar();
    //         $cadena = "DELETE FROM `clientes` WHERE `idClientes`= $idClientes";
    //         if (mysqli_query($con, $cadena)) {
    //             return 1; // Success
    //         } else {
    //             return $con->error;
    //         }
    //     } catch (Exception $th) {
    //         return $th->getMessage();
    //     } finally {
    //         $con->close();
    //     }
    // }

    public function __construct() {}
}
