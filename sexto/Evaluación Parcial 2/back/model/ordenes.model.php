<?php
require_once '../config/config.php';

class Ordenes {

  public function todos() {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM ordenes";
    $datos = mysqli_query($con, $consulta);

    if ($datos && mysqli_num_rows($datos) > 0) {
      $ordenes = [];
      while ($row = mysqli_fetch_assoc($datos)) {
        $ordenes[] = $row;
      }
    }
    
    $con->close();

    return $ordenes;
  }

  public function uno($id) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM ordenes WHERE id = $id";

    $datos = mysqli_query($con, $consulta);
    $orden = mysqli_fetch_assoc($datos);

    $con->close();
    return $orden;
  }

  public function insertar($cliente_id, $menu_id, $total, $fecha) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "INSERT INTO ordenes (cliente_id, menu_id, total, fecha) VALUES ($cliente_id, $menu_id, $total, '$fecha')";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }

  public function actualizar($id, $cliente_id, $menu_id, $total, $fecha) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "UPDATE ordenes SET cliente_id = $cliente_id, menu_id = $menu_id, total = $total, fecha = '$fecha' WHERE id = $id";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }

  
  public function actualizarTotal($id) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "UPDATE ordenes set total = (select sum(total) from detalle_ordenes where orden_id = $id) where id = $id";

    $datos = mysqli_query($con, $consulta);
    
    $con->close();
    return $datos;
  }
}
?>
