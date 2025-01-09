<?php
require_once '../models/VehiculoModelo.php';
require_once '../config/Conexion.php';
require_once '../config/Cors.php';

$vehiculoController = new VehiculoController();
$method = $_SERVER['REQUEST_METHOD']; // Obtener el método HTTP

// Verifica si el ID está en la URL, solo para métodos que lo requieran (PUT, DELETE)
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Ejecutar el controlador de solicitudes según el método
$vehiculoController->controlSolicitudes($method, $id);

class VehiculoController {
    private $modelo;

    public function __construct() {
        $conexion = new Conexion();
        $this->modelo = new Vehiculo($conexion->crearConexion());
    }

    /*
    * Manejar las solicitudes HTTP
    */
    public function controlSolicitudes($method, $id = null) {
        // Obtener los datos de la solicitud (solo para POST y PUT)
        $data = json_decode(file_get_contents('php://input'), true);

        switch ($method) {
            case 'GET':
                if ($id) {
                    echo json_encode($this->obtener($id));
                } else {
                    echo json_encode($this->listar());
                }
                break;
            case 'POST':
                echo json_encode($this->crear($data));
                break;
            case 'PUT':
                if ($id) {
                    echo json_encode($this->actualizar($id, $data));
                } else {
                    echo json_encode( [
                        "status" => false,
                        "message" => "ID requerido para actualizar un vehículo.",
                        "data" => []]);
                }
                break;
            case 'DELETE':
                if ($id) {
                    echo json_encode($this->eliminar($id));
                } else {
                    echo json_encode( [
                        "status" => false,
                        "message" => "ID requerido para eliminar un vehículo.",
                        "data" => []]);
                }
                break;
            default:
                echo json_encode( [
                    "status" => false,
                    "message" => "Método HTTP no soportado.",
                    "data" => []]);
        }
    }

    /*
    * Listar todos los vehículos
    */
    private function listar() {
        $resultado = $this->modelo->listar();
        if ($resultado) {
            $vehiculos = [];
            while ($row = $resultado->fetch_assoc()) {
                $vehiculos[] = $row;
            }
            return $vehiculos;
        } else {
            return [
                "status" => false,
                "message" => "No se pudieron obtener los vehículos.",
                "data" => []
                ];
        }
    }

    /*
    * Obtener un vehículo por ID
    */
    private function obtener($id) {
        $resultado = $this->modelo->obtener($id);
        if ($resultado) {
            return $resultado->fetch_assoc();
        } else {
            return [
                "status" => false,
                "message" => "No se pudo obtener el vehículo.",
                "data" => []
                ];
        }
    }

    /*
    * Crear un nuevo vehículo
    */
    private function crear() {
        try {
            // Obtener los datos del cuerpo de la solicitud POST
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['placa'], $data['marca'], $data['modelo'], $data['color'])) {
                $this->modelo->placa = $data['placa'];
                $this->modelo->marca = $data['marca'];
                $this->modelo->modelo = $data['modelo'];
                $this->modelo->color = $data['color'];

                // Intentar crear el vehículo
                if ($this->modelo->crear()) {
                    return [
                        "status" => true,
                        "message" => "Vehículo creado exitosamente.",
                        "data" => []
                        ];
                } else {
                    return [
                        "status" => false,
                        "message" => "No se pudo crear el vehículo.",
                        "data" => []
                        ];
                }
            } else {
                return [
                    "status" => false,
                    "message" => "Datos incompletos para crear el vehículo.",
                    "data" => []
                    ];
            }
        } catch (Exception $e) {
            return [
                "status" => false,
                "message" => "Ocurrió un error: " . $e->getMessage(),
                "data" => []
                ];
        }
    }

    /*
    * Actualizar un vehículo existente
    */
    private function actualizar($id) {
        try {
            // Obtener los datos del cuerpo de la solicitud POST
            $data = json_decode(file_get_contents('php://input'), true);
    
            if (isset($data['placa'], $data['marca'], $data['modelo'], $data['color'])) {
                // Asignar los valores al modelo
                $this->modelo->id = $id;
                $this->modelo->placa = $data['placa'];
                $this->modelo->marca = $data['marca'];
                $this->modelo->modelo = $data['modelo'];
                $this->modelo->color = $data['color'];
    
                // Intentar actualizar el vehículo
                if ($this->modelo->actualizar()) {
                    return ["success" => "Vehículo actualizado exitosamente."];
                } else {
                    return ["error" => "No se pudo actualizar el vehículo."];
                }
            } else {
                return ["error" => "Datos incompletos para actualizar el vehículo."];
            }
        } catch (Exception $e) {
            return ["error" => "Ocurrió un error: " . $e->getMessage()];
        }
    }
    

    /*
    * Eliminar un vehículo
    */
    private function eliminar($id) {
        try {
            if ($this->modelo->eliminar($id)) {
                return ["success" => "Vehículo eliminado exitosamente."];
            } else {
                return ["error" => "No se pudo eliminar el vehículo."];
            }
        } catch (Exception $e) {
            return ["error" => "Ocurrió un error: " . $e->getMessage()];
        }
    }
}
?>
