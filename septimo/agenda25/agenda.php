<?php
include 'cors.php';
include 'config.php';

$post = json_decode(file_get_contents('php://input'), true);

if($post['accion'] == 'login') {
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s' AND clave_persona = '%s'", $post['usuario'], $post['clave']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_assoc($rs)) {
            $data = array (
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

if($post['accion'] == 'vcedula') {
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s'", $post['ci']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        $respuesta = json_encode(array('estado' => true));
    } else {
        $respuesta = json_encode(array('estado' => false));
    }

    echo $respuesta;
}

if($post['accion'] == 'cuenta') {
    $sentencia = sprintf("INSERT INTO persona (ci_persona, nom_persona, ape_persona, correo_persona, clave_persona) VALUES ('%s', '%s', '%s', '%s', '%s')", $post['cedula'], $post['nombre'], $post['apellido'], $post['correo'], $post['clave']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Cuenta creada correctamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al crear la cuenta"));
    }

    echo $respuesta;
}

if($post['accion'] == 'listar-contactos') {
  $sentencia = sprintf("SELECT * FROM contacto WHERE persona_cod_persona = '%s'", $post['codigo']);
  $rs = mysqli_query($mysqli, $sentencia);
  if(mysqli_num_rows($rs) > 0) {
    while($row = mysqli_fetch_assoc($rs)) {
      $data[] = array (
        'codigo' => $row ['cod_contacto'],
        'nombre' => $row ['nom_contacto'],
        'telefono' => $row ['tel_contacto'],
      );
    }
    $respuesta = json_encode(array('estado' => true, 'data' => $data));
  } else {
    $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay contactos registrados'));
  }
  echo $respuesta;
}

?>