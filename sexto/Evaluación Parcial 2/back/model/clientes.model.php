<?php
require_once '../config/config.php';

class Clientes {

  public function todos() {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM clientes";
    $datos = mysqli_query($con, $consulta);

    if($datos && mysqli_num_rows($datos) > 0) {
      $cliente =  [];
      while($row = mysqli_fetch_assoc($datos)) {
        $cliente[] = $row;
      }
    }
    
    $con->close();

    return $cliente;
  }

  public function uno($id) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "SELECT * FROM clientes WHERE id = $id";

    $datos = mysqli_query($con, $consulta);
    $cliente = mysqli_fetch_assoc($datos);

    $con->close();
    return $cliente;
  }

  public function insertar($nombre, $apellido, $telefono, $email) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "INSERT INTO clientes (nombre, apellido, telefono, email) VALUES ('$nombre', '$apellido', '$telefono', '$email')";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }

  public function actualizar($id, $nombre, $apellido, $telefono, $email) {
    $con = new ClaseConectar();
    $con = $con->ProcedimientoParaConectar();
    $consulta = "UPDATE clientes SET nombre = '$nombre', apellido = '$apellido', telefono = '$telefono', email = '$email' WHERE id = $id";

    $datos = mysqli_query($con, $consulta);

    $con->close();
    return $datos;
  }
}
  

?>