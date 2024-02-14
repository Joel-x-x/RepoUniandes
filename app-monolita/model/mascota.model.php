<?php


//importar archivo de conexión
require_once('../config/conexion.php');

class ClaseMascotas
{
    public function todos()
    {

        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "select m.nombre, m.color, m.sexo, t.detalle as tipo, r.detalle as raza from mascotas m join tipos t on t.id = m.tipo_id join razas r on r.id = m.raza_id;";
        $resultado = mysqli_query($con, $cadena);
        return $resultado;
    }
}
