<?php
// TODO: Clase de Clientes Tienda Cel@g
require_once('../config/config.php');

class Login {

    public function login($usuario, $password) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "SELECT * FROM `usuarios` WHERE `usuario` = '$usuario' AND `password` = '$password'";
            $resultado = mysqli_query($con, $cadena);
            
            if (mysqli_num_rows($resultado) > 0) {
                return true; // Usuario encontrado
            } else {
                return false; // Usuario no encontrado
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    

    public function __construct() {}
}
