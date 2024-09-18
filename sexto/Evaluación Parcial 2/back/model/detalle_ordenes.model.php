<?php
require_once '../config/config.php';

class DetalleOrdenes {

  public function todos() {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM detalle_ordenes";
    $datos = mysqli_query($con, $consulta);

    if ($datos && mysqli_num_rows($datos) > 0) {
      $detalle_ordenes = [];
      while ($row = mysqli_fetch_assoc($datos)) {
        $detalle_ordenes[] = $row;
      }
    }
    
    $con->close();

    return $detalle_ordenes;
  }

  public function uno($id) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM detalle_ordenes WHERE id = $id";

    $datos = mysqli_query($con, $consulta);
    $detalle_orden = mysqli_fetch_assoc($datos);

    $con->close();
    return $detalle_orden;
  }

  public function insertar($orden_id, $menu_id, $precio_unitario, $cantidad, $total) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "INSERT INTO detalle_ordenes (orden_id, menu_id, precio_unitario, cantidad, total) VALUES ($orden_id, $menu_id, $precio_unitario, $cantidad, $total)";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }

  public function actualizar($id, $orden_id, $menu_id, $precio_unitario, $cantidad, $total) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "UPDATE detalle_ordenes SET orden_id = $orden_id, menu_id = $menu_id, precio_unitario = $precio_unitario, cantidad = $cantidad, total = $total WHERE id = $id";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }
}
?>
