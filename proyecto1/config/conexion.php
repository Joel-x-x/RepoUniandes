<?php

class Conexion {
  
  public $conexion;
  protected $bd;
  private $servidor = "localhost";
  private $usuario = "root";
  private $password = "";
  private $nombreBaseDatos = "Quinto";

  public function conectar() {
    $this->conexion = mysqli_connect($this->servidor, $this->usuario, $this->password, $this->nombreBaseDatos);

    mysqli_query($this->conexion, "SET NAMES 'utf-8'");

    if(!$this->conexion) die ("Error al conectarse al servidor" . mysqli_error($this->conexion));

    $this->bd = mysqli_select_db($this->conexion, $this->nombreBaseDatos);

    if(!$this->bd) {
      die("Error al conectarse con la base de datos" . mysqli_error($this->conexion));
    };

    return $this->conexion;
  }
  
}

?>