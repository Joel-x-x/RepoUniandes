<?php
require_once '../models/ClienteModelo.php';
require_once '../config/Conexion.php';
require_once '../config/Cors.php';

$clienteController = new ClienteController();
$method = $_SERVER['REQUEST_METHOD']; // Obtener el método HTTP

// Verifica si el ID está en la URL, solo para métodos que lo requieran (PUT, DELETE)
$id = isset($_GET['id']) ? $_GET['id'] : null;

// Ejecutar el controlador de solicitudes según el método
$clienteController->controlSolicitudes($method, $id);

class ClienteController {
    private $modelo;

    public function __construct() {
        $conexion = new Conexion();
        $this->modelo = new Cliente($conexion->crearConexion());
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
                        "message" => "ID requerido para actualizar un cliente.",
                        "data" => []]);
                }
                break;
            case 'DELETE':
                if ($id) {
                    echo json_encode($this->eliminar($id));
                } else {
                    echo json_encode( [
                        "status" => false,
                        "message" => "ID requerido para eliminar un cliente.",
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
    * Listar todos los clientes
    */
    private function listar() {
        $resultado = $this->modelo->listar();
        if ($resultado) {
            $clientes = [];
            while ($row = $resultado->fetch_assoc()) {
                $clientes[] = $row;
            }
            return $clientes;
        } else {
            return [
                "status" => false,
                "message" => "No se pudieron obtener los clientes.",
                "data" => []
                ];
        }
    }

    /*
    * Obtener un cliente por ID
    */
    private function obtener($id) {
        $resultado = $this->modelo->obtener($id);
        if ($resultado) {
            return $resultado->fetch_assoc();
        } else {
            return [
                "status" => false,
                "message" => "No se pudo obtener el cliente.",
                "data" => []
                ];
        }
    }

    /*
    * Crear un nuevo cliente
    */
    private function crear($data) {
        try {
            if (isset($data['nombre_completo'], $data['identificacion'], $data['telefono'])) {
                // Verificar si la cédula ya existe
                $clienteExistente = $this->modelo->buscarPorIdentificacion($data['identificacion']);
                if ($clienteExistente) {
                    return [
                        "status" => false,
                        "message" => "La cédula ya está registrada.",
                        "data" => []
                    ];
                }
    
                // Si la cédula no existe, asignamos los valores y creamos el cliente
                $this->modelo->nombre_completo = $data['nombre_completo'];
                $this->modelo->identificacion = $data['identificacion'];
                $this->modelo->telefono = $data['telefono'];
    
                // Intentar crear el cliente
                if ($this->modelo->crear()) {
                    return [
                        "status" => true,
                        "message" => "Cliente creado exitosamente."
                    ];
                } else {
                    return [
                        "status" => false,
                        "message" => "No se pudo crear el cliente.",
                        "data" => []
                    ];
                }
            } else {
                return [
                    "status" => false,
                    "message" => "Datos incompletos para crear el cliente.",
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
    * Actualizar un cliente existente
    */
    private function actualizar($id, $data) {
        try {
            if (isset($data['nombre_completo'], $data['identificacion'], $data['telefono'])) {
                $this->modelo->id = $id;
                $this->modelo->nombre_completo = $data['nombre_completo'];
                $this->modelo->identificacion = $data['identificacion'];
                $this->modelo->telefono = $data['telefono'];

                if ($this->modelo->actualizar()) {
                    return ["success" => "Cliente actualizado exitosamente."];
                } else {
                    return ["error" => "No se pudo actualizar el cliente."];
                }
            } else {
                return ["error" => "Datos incompletos para actualizar el cliente."];
            }
        } catch (Exception $e) {
            return ["error" => "Ocurrió un error: " . $e->getMessage()];
        }
    }

    /*
    * Eliminar un cliente
    */
    private function eliminar($id) {
        try {
            if ($this->modelo->eliminar($id)) {
                return ["success" => "Cliente eliminado exitosamente."];
            } else {
                return ["error" => "No se pudo eliminar el cliente."];
            }
        } catch (Exception $e) {
            return ["error" => "Ocurrió un error: " . $e->getMessage()];
        }
    }
}
?>
