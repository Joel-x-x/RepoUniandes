<?php
require_once '../models/RegistroModel.php';
require_once '../config/Conexion.php';
require_once '../config/Cors.php';

$registroController = new RegistroController();
$method = $_SERVER['REQUEST_METHOD']; // Obtener el método HTTP

// Verifica si el ID está en la URL, solo para métodos que lo requieran (PUT, DELETE)
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Ejecutar el controlador de solicitudes según el método
$registroController->controlSolicitudes($method, $id);

class RegistroController {
    private $modelo;

    public function __construct() {
        $conexion = new Conexion();
        $this->modelo = new Registro($conexion->crearConexion());
    }

    /*
    * Manejar las solicitudes HTTP
    */
    public function controlSolicitudes($method, $id = null) {
        // Obtener los datos de la solicitud (solo para POST y PUT)
        $data = json_decode(file_get_contents('php://input'), true);

        switch ($method) {
            case 'GET':
                echo json_encode($this->listar());
                break;
            case 'POST':
                echo json_encode($this->entrada());
                break;
            case 'PUT':
                if ($id) {
                    echo json_encode($this->salida($id));
                } else {
                    echo json_encode( [
                        "status" => false,
                        "message" => "ID requerido para actualizar el registro.",
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
    * Listar todos los registros
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
                "message" => "No se pudieron obtener los registros.",
                "data" => []
                ];
        }
    }

    // /*
    // * Obtener un vehículo por ID
    // */
    // private function obtener($id) {
    //     $resultado = $this->modelo->obtener($id);
    //     if ($resultado) {
    //         return $resultado->fetch_assoc();
    //     } else {
    //         return ["error" => "No se pudo obtener el vehículo."];
    //     }
    // }

    /*
    * Crear un nuevo vehículo
    */
    private function entrada() {
        try {
            // Obtener los datos del cuerpo de la solicitud POST
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['entrada'], $data['vehiculo_id'], $data['cliente_id'])) {
                $this->modelo->entrada = $data['entrada'];
                $this->modelo->vehiculo_id = $data['vehiculo_id'];
                $this->modelo->cliente_id = $data['cliente_id'];

                // Intentar crear el registro
                if ($this->modelo->entrada()) {
                    return [
                        "status" => true,
                        "message" => "Entrada registrada exitosamente.",
                        "data" => []
                        ];
                } else {
                    return [
                        "status" => false,
                        "message" => "No se pudo registrar la entrada.",
                        "data" => []
                        ];
                }
            } else {
                return [
                    "status" => false,
                    "message" => "Datos incompletos para registrar la entrada.",
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
    * Registrar la salida
    */
    private function salida($id) {
        try {
            // Obtener los datos del cuerpo de la solicitud POST
            $data = json_decode(file_get_contents('php://input'), true);
    
            if (isset($data['salida'], $data['total'])) {
                // Asignar los valores al modelo
                $this->modelo->id = $id;
                $this->modelo->salida = $data['salida'];
                $this->modelo->total = $data['total'];

                // Intentar registrar la salida
                if ($this->modelo->salida()) {
                    return [
                        "status" => true,
                        "message" => "Salida registrada exitosamente.",
                        ];
                } else {
                    return [
                        "status" => false,
                        "message" => "No se pudo registrar la salida.",
                        "data" => []
                        ];
                }
            } else {
                return [
                    "status" => false,
                    "message" => "Datos incompletos para registrar la salida.",
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
    

    // /*
    // * Eliminar un vehículo
    // */
    // private function eliminar($id) {
    //     try {
    //         if ($this->modelo->eliminar($id)) {
    //             return ["success" => "Vehículo eliminado exitosamente."];
    //         } else {
    //             return ["error" => "No se pudo eliminar el vehículo."];
    //         }
    //     } catch (Exception $e) {
    //         return ["error" => "Ocurrió un error: " . $e->getMessage()];
    //     }
    // }
}
?>
