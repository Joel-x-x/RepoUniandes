<?php
require_once '../config/config.php';

class Reportes {

  public function reporteOrdenesGeneradas($inicio, $fin)
  {
      $con = new ClaseConectar();
      $con = $con->ProcedimientoParaConectar();
      
      $inicio = mysqli_real_escape_string($con, $inicio);
      $fin = mysqli_real_escape_string($con, $fin);
      
      $consulta = "SELECT * FROM ordenes WHERE fecha BETWEEN '$inicio' AND '$fin'";
      
      $datos = mysqli_query($con, $consulta);
      
      $ordenes = [];
      
      if ($datos && mysqli_num_rows($datos) > 0) {
          while ($row = mysqli_fetch_assoc($datos)) {
              $ordenes[] = $row;
          }
      }
      
      $con->close();
      
      return $ordenes;
  }
  
}
