<?php
class Usuario {
    private $conexion;

    public $id;
    public $nombre_completo;
    public $email;
    public $password;

    public function __construct($conexion) {
        $this->conexion = $conexion;
    }

    /*
    * Obtener un usuario por correo electrónico
    */
    public function obtenerPorEmail($email) {
        $query = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $email);  // 's' es para string
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    /*
    * Verificar si la contraseña es correcta
    */
    public function verificarPassword($password, $hash) {
        return password_verify($password, $hash);
    }
}
?>
