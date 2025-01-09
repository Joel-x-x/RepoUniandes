<?php
class Registro {
    private $conexion;

    public $id;
    public $entrada;
    public $salida;
    public $total;
    public $vehiculo_id;
    public $cliente_id;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    /*
    * Listar registros de vehículos
    */
    public function listar() {
        $query = "SELECT 
        r.id AS id, r.entrada, r.salida, r.total, 
        v.id AS vehiculo_id, v.marca, v.modelo, v.placa, v.color, 
        c.id AS cliente_id, c.nombre_completo, c.identificacion, c.telefono 
        FROM registros r 
        JOIN vehiculos v ON r.vehiculo_id = v.id 
        JOIN clientes c ON r.cliente_id = c.id 
        ORDER BY r.entrada";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        return $stmt->get_result();
    }

    // /*
    // * Obtener un vehículo por ID
    // */
    // public function obtener($id) {
    //     $query = "SELECT * FROM vehiculos WHERE id = ?";
    //     $stmt = $this->conexion->prepare($query);
    //     $stmt->bind_param("i", $id);  // 'i' es para integer
    //     $stmt->execute();
    //     return $stmt->get_result();
    // }

    /*
    * Crear un nuevo registro
    */
    public function entrada() {
        $query = "INSERT INTO registros (entrada, vehiculo_id, cliente_id) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        // 's' es para string y 'i' para integer
        $stmt->bind_param("sii", $this->entrada, $this->vehiculo_id, $this->cliente_id);
        
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    /*
    * Actualizar un vehículo existente
    */
    public function salida() {
        $query = "UPDATE registros SET salida = ?, total = ? WHERE id = ?";
        $stmt = $this->conexion->prepare($query);
        // 'i' es para integer y 's' para string
        $stmt->bind_param("sdi", $this->salida, $this->total, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // /*
    // * Eliminar un vehículo
    // */
    // public function eliminar($id) {
    //     $query = "DELETE FROM vehiculos WHERE id = ?";
    //     $stmt = $this->conexion->prepare($query);

    //     $stmt->bind_param("i", $id);  // 'i' es para integer
    //     return $stmt->execute();
    // }
}
