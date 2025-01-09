<?php
class Conexion {
    
     private $servername = "localhost";
     private $username = "root";
     private $password = "";
     private $dbname = "parqueadero";

    public function __construct() {
        $this->crearConexion();
    }
    /*
    *
    * Crear conexión a la base de datos
    *
    */
    public function crearConexion() {
        // Crear conección
        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        // Verificar conección
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        // echo "Connected successfully";
        return $conn;
    }

}

?>