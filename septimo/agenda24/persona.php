<?php
include('config.php');
header('Access-Control-Allow-Origin: **');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');
header('ContentType: application/json; charset=utf-8');

$post = json_decode(file_get_contents("php://input"), true);

if($post['accion'] == 'consultar') {
    $sentencia = sprintf("SELECT * FROM persona");
    $rs = mysqli_query($conn, $sentencia);
    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_array($rs)) {
            $datos[] = array (
                'codigo'=>$row['cod_persona'],
                'nombre'=>$row['nom_persona'],
                'apellido'=>$row['ape_persona'],
                'cedula'=>$row['ci_persona']
            );
        }
        $respuesta = json_encode(array('estado'=> true, 'personas'=>$datos));
    } else {
        $respuesta = json_encode(array('estado'=> false, 'mensaje'=> 'No hay personas'));
    }

    echo $respuesta;
} else if($post['accion'] == 'guardar') {
    // Obtener los datos del formulario o solicitud
    $nombre = mysqli_real_escape_string($conn, $post['nombre']);
    $apellido = mysqli_real_escape_string($conn, $post['apellido']);
    $cedula = mysqli_real_escape_string($conn, $post['cedula']);
    $email = mysqli_real_escape_string($conn, $post['email']);
    $clave = mysqli_real_escape_string($conn, $post['clave']);

    // Verificar si los campos están vacíos
    if (empty($nombre) || empty($apellido) || empty($cedula)) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Todos los campos son obligatorios'));
    } else {
        // Insertar los datos en la base de datos
        $sentencia = sprintf(
            "INSERT INTO persona (nom_persona, ape_persona, ci_persona, correo_persona, clave_persona ) VALUES ('%s', '%s', '%s', '%s', '%s')",
            $nombre,
            $apellido,
            $cedula,
            $email,
            $clave
        );

        // Ejecutar la sentencia SQL
        if (mysqli_query($conn, $sentencia)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Persona guardada exitosamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al guardar la persona'));
        }
    }

    // Enviar la respuesta JSON
    echo $respuesta;
} else if($post['accion'] == 'actualizar') {
    // Obtener los datos del formulario o solicitud
    $id = mysqli_real_escape_string($conn, $post['codigo']);  // El identificador único de la persona (por ejemplo, id o cedula)
    $nombre = mysqli_real_escape_string($conn, $post['nombre']);
    $apellido = mysqli_real_escape_string($conn, $post['apellido']);
    $cedula = mysqli_real_escape_string($conn, $post['cedula']);

    // Verificar si los campos están vacíos
    if (empty($id) || empty($nombre) || empty($apellido) || empty($cedula)) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Todos los campos son obligatorios'));
    } else {
        // Sentencia SQL para actualizar los datos
        $sentencia = sprintf(
            "UPDATE persona SET nom_persona='%s', ape_persona='%s', ci_persona='%s' WHERE cod_persona='%s'",
            $nombre,
            $apellido,
            $cedula,
            $id
        );

        // Ejecutar la sentencia SQL
        if (mysqli_query($conn, $sentencia)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Persona actualizada exitosamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar la persona'));
        }
    }

    // Enviar la respuesta JSON
    echo $respuesta;
} else if($post['accion'] == 'eliminar') {
    // Obtener el identificador único de la persona (por ejemplo, id o cedula)
    $id = mysqli_real_escape_string($conn, $post['codigo']);

    // Verificar si el identificador está vacío
    if (empty($id)) {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'El ID es obligatorio para eliminar'));
    } else {
        // Sentencia SQL para eliminar el registro
        $sentencia = sprintf(
            "DELETE FROM persona WHERE cod_persona='%s'",
            $id
        );

        // Ejecutar la sentencia SQL
        if (mysqli_query($conn, $sentencia)) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Persona eliminada exitosamente'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar la persona'));
        }
    }

    // Enviar la respuesta JSON
    echo $respuesta;
}



?>