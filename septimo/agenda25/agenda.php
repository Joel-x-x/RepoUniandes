<?php
include 'cors.php';
include 'config.php';

$post = json_decode(file_get_contents('php://input'), true);

if($post['accion'] == 'login') {
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s' AND clave_persona = '%s'", $post['usuario'], $post['clave']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_assoc($rs)) {
            $data[] = array (
                'codigo' => $row ['cod_persona'],
                'nombre' => $row ['nom_persona'] . " " . $row['ape_persona'],
            );
        }
        $respuesta = json_encode(array('estado' => true, 'persona' => $data));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Usuario o clave incorrectos'));
    }

    echo $respuesta;
}
?>