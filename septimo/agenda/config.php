<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agenda24";

// Crear conección
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conección
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>