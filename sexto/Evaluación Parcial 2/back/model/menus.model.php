<?php
require_once '../config/config.php';

class Menus {

  public function todos() {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM menus";
    $datos = mysqli_query($con, $consulta);

    if ($datos && mysqli_num_rows($datos) > 0) {
      $menus = [];
      while ($row = mysqli_fetch_assoc($datos)) {
        $menus[] = $row;
      }
    }
    
    $con->close();

    return $menus;
  }

  public function uno($id) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM menus WHERE id = $id";

    $datos = mysqli_query($con, $consulta);
    $menu = mysqli_fetch_assoc($datos);

    $con->close();
    return $menu;
  }

  public function insertar($nombre, $descripcion, $precio, $disponible) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "INSERT INTO menus (nombre, descripcion, precio, disponible) VALUES ('$nombre', '$descripcion', $precio, $disponible)";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }

  public function actualizar($id, $nombre, $descripcion, $precio, $disponible) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "UPDATE menus SET nombre = '$nombre', descripcion = '$descripcion', precio = $precio, disponible = $disponible WHERE id = $id";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }
}
?>
