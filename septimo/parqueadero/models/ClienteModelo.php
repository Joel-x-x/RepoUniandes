<?php
class Cliente {
    private $conexion;

    public $id;
    public $nombre_completo;
    public $identificacion;
    public $telefono;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    /*
    * Listar todos los clientes
    */
    public function listar() {
        $query = "SELECT * FROM clientes";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    /*
    * Obtener un cliente por ID
    */
    public function obtener($id) {
        $query = "SELECT * FROM clientes WHERE id = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id);  // 'i' es para integer
        $stmt->execute();
        return $stmt->get_result();
    }

    /*
    * Crear un nuevo cliente
    */
    public function crear() {
        $query = "INSERT INTO clientes (nombre_completo, identificacion, telefono) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        // 's' es para string
        $stmt->bind_param("sss", $this->nombre_completo, $this->identificacion, $this->telefono);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    /*
    * Buscar por identificación
    */
    public function buscarPorIdentificacion($identificacion) {
        $query = "SELECT * FROM clientes WHERE identificacion = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $identificacion);
        $stmt->execute();
        $resultado = $stmt->get_result();
        return $resultado->fetch_assoc(); // Devuelve los datos del cliente si existe, o null si no existe
    }

    /*
    * Actualizar un cliente existente
    */
    public function actualizar() {
        $query = "UPDATE clientes SET nombre_completo = ?, identificacion = ?, telefono = ? WHERE id = ?";
        $stmt = $this->conexion->prepare($query);

        // 'i' es para integer y 's' para string
        $stmt->bind_param("sssi", $this->nombre_completo, $this->identificacion, $this->telefono, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    /*
    * Eliminar un cliente
    */
    public function eliminar($id) {
        $query = "DELETE FROM clientes WHERE id = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("i", $id);  // 'i' es para integer
        return $stmt->execute();
    }
}
?>
