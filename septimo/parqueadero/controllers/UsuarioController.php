<?php
require_once '../models/UsuarioModel.php';
require_once '../config/Conexion.php';
require_once '../config/Cors.php';

$usuarioController = new UsuarioController();
$method = $_SERVER['REQUEST_METHOD']; // Obtener el método HTTP

// Ejecutar el controlador de solicitudes según el método
$usuarioController->controlSolicitudes($method);

class UsuarioController {
    private $modelo;

    public function __construct() {
        $conexion = new Conexion();
        $this->modelo = new Usuario($conexion->crearConexion());
    }

    /*
    * Manejar las solicitudes HTTP
    */
    public function controlSolicitudes($method) {
        // Obtener los datos de la solicitud (solo para POST)
        $data = json_decode(file_get_contents('php://input'), true);

        switch ($method) {
            case 'POST':
                echo json_encode($this->login($data));
                break;
            default:
                echo json_encode(["error" => "Método HTTP no soportado."]);
        }
    }

    /*
    * Login de usuario
    */
    private function login($data) {
        try {
            if (isset($data['email'], $data['password'])) {
                $usuario = $this->modelo->obtenerPorEmail($data['email']);
                if ($usuario && $this->modelo->verificarPassword($data['password'], $usuario['password'])) {
                    return [
                        "status" => true,
                        "message" => "Login exitoso",
                        "data" => [
                            "id" => $usuario['id'],
                            "nombre_completo" => $usuario['nombre_completo']
                        ]
                        ];
                } else {
                    return ["status" => false, "message" => "Credenciales incorrectas"];
                }
            } else {
                return ["status" => false, "message" => "Email y contraseña requeridos"];
            }
        } catch (Exception $e) {
            return ["status" => false, "message" => "Ocurrió un error: " . $e->getMessage()];
        }
    }
}
?>
