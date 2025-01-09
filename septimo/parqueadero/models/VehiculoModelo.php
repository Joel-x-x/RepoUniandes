<?php
class Vehiculo {
    private $conexion;

    public $id;
    public $placa;
    public $identificacion;
    public $marca;
    public $modelo;
    public $color;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    /*
    * Listar todos los vehículos
    */
    public function listar() {
        $query = "SELECT * FROM vehiculos";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    /*
    * Obtener un vehículo por ID
    */
    public function obtener($id) {
        $query = "SELECT * FROM vehiculos WHERE id = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id);  // 'i' es para integer
        $stmt->execute();
        return $stmt->get_result();
    }

    /*
    * Crear un nuevo vehículo
    */
    public function crear() {
        $query = "INSERT INTO vehiculos (placa, marca, modelo, color) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        // 's' es para string y 'i' para integer
        $stmt->bind_param("ssss", $this->placa, $this->marca, $this->modelo, $this->color);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    /*
    * Actualizar un vehículo existente
    */
    public function actualizar() {
        $query = "UPDATE vehiculos SET placa = ?, marca = ?, modelo = ?, color = ? WHERE id = ?";
        $stmt = $this->conexion->prepare($query);

        // 'i' es para integer y 's' para string
        $stmt->bind_param("ssssi", $this->placa, $this->marca, $this->modelo, $this->color, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    /*
    * Eliminar un vehículo
    */
    public function eliminar($id) {
        $query = "DELETE FROM vehiculos WHERE id = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("i", $id);  // 'i' es para integer
        return $stmt->execute();
    }
}
