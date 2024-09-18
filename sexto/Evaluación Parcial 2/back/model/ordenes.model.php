<?php
require_once '../config/config.php';

class Ordenes
{

  public function todos()
  {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT o.*, c.nombre, c.apellido 
    FROM ordenes o 
    JOIN clientes c ON c.id = o.cliente_id;
    ";
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

  public function uno($id)
  {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM ordenes WHERE id = $id";

    $datos = mysqli_query($con, $consulta);
    $orden = mysqli_fetch_assoc($datos);

    $con->close();
    return $orden;
  }

  public function insertar($cliente_id, $menu_id, $total, $fecha)
  {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "INSERT INTO ordenes (cliente_id, menu_id, total, fecha) VALUES ($cliente_id, $menu_id, $total, '$fecha')";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }

  public function actualizar($id, $cliente_id, $menu_id, $total, $fecha)
  {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "UPDATE ordenes SET cliente_id = $cliente_id, menu_id = $menu_id, total = $total, fecha = '$fecha' WHERE id = $id";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }


  public function actualizarTotal($id)
  {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consultaTotal = "SELECT SUM(total) AS total FROM detalle_ordenes WHERE orden_id = $id";
    $total = mysqli_query($con, $consultaTotal);
    $total = mysqli_fetch_assoc($total)['total'];
    $total = (float) $total;
    $consulta = "UPDATE ordenes set total = $total where id = $id";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $total;
  }

  public function eliminar($id)
  {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "DELETE FROM ordenes WHERE id = $id";

    if (mysqli_query($con, $consulta)) {
      return true;
    } else {
      return false;
    }

    $con->close();
  }
}
