<?php
include('config.php');
header('Access-Control-Allow-Origin: **');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');
header('ContentType: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"), true);

if($post['accion'] == 'consultar') {
    $codigoPe = $post['codigoPersona'];
    $sentencia = sprintf("SELECT * FROM contacto WHERE persona_cod_persona = '%s'", $codigoPe);
    $rs = mysqli_query($conn, $sentencia);
    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_array($rs)) {
            $datos[] = array (
                'codigo'=>$row['cod_contacto'],
                'nombre'=>$row['nom_contacto'],
                'apellido'=>$row['ape_contacto'],
                'telefono'=>$row['telefono_contacto'],
                'email'=>$row['email_contacto'],
                'codigoPersona'=>$row['persona_cod_persona']
            );
        }
        $respuesta = json_encode(array('estado'=> true, 'contactos'=>$datos));
    } else {
        $respuesta = json_encode(array('estado'=> false, 'mensaje'=> 'No hay contactos'));
    }

    echo $respuesta;
} else if($post['accion'] == 'guardar') {
    // Obtener los datos del formulario o solicitud
    $nombre = mysqli_real_escape_string($conn, $post['nombre']);
    $apellido = mysqli_real_escape_string($conn, $post['apellido']);
    $telefono = mysqli_real_escape_string($conn, $post['telefono']);
    $email = mysqli_real_escape_string($conn, $post['email']);
    $codigoPersona = mysqli_real_escape_string($conn, $post['codigoPersona']);

    // Verificar si los campos están vacíos
    if (empty($nombre) || empty($apellido) || empty($telefono) || empty($codigoPersona)) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Todos los campos son obligatorios'));
    } else {
        // Insertar los datos en la base de datos
        $sentencia = sprintf(
            "INSERT INTO contacto (nom_contacto, ape_contacto, telefono_contacto, email_contacto, persona_cod_persona ) VALUES ('%s', '%s', '%s', '%s', '%s')",
            $nombre,
            $apellido,
            $telefono,
            $email,
            $codigoPersona
        );

        if (mysqli_query($conn, $sentencia)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'contacto guardada exitosamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al guardar la contacto'));
        }
    }

    echo $respuesta;
} else if($post['accion'] == 'actualizar') {
    $id = mysqli_real_escape_string($conn, $post['codigo']);
    $nombre = mysqli_real_escape_string($conn, $post['nombre']);
    $apellido = mysqli_real_escape_string($conn, $post['apellido']);
    $telefono = mysqli_real_escape_string($conn, $post['telefono']);

    if (empty($id) || empty($nombre) || empty($apellido) || empty($telefono)) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Todos los campos son obligatorios'));
    } else {
        $sentencia = sprintf(
            "UPDATE contacto SET nom_contacto='%s', ape_contacto='%s', telefono_contacto ='%s' WHERE cod_contacto='%s'",
            $nombre,
            $apellido,
            $telefono,
            $id
        );

        if (mysqli_query($conn, $sentencia)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'contacto actualizada exitosamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar la contacto'));
        }
    }

    echo $respuesta;
} else if($post['accion'] == 'eliminar') {
    $id = mysqli_real_escape_string($conn, $post['codigo']);

    if (empty($id)) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'El ID es obligatorio para eliminar'));
    } else {
        $sentencia = sprintf(
            "DELETE FROM contacto WHERE cod_contacto='%s'",
            $id
        );

        if (mysqli_query($conn, $sentencia)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'contacto eliminada exitosamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar la contacto'));
        }
    }

    echo $respuesta;
}



?>