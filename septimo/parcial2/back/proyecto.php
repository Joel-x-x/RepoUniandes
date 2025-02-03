<?php
include 'cors.php';
include 'config.php';
error_reporting(0);

$post = json_decode(file_get_contents('php://input'), true);

if($post['accion'] == 'listar') {
    $sentencia = sprintf('SELECT * FROM proyectos WHERE estado <> 0 ORDER BY creacion DESC');
    
    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_assoc($rs)) {
           $datos[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'creacion' => $row['creacion'],
            'actualizacion' => $row['actualizacion'] 
           );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'No hay proyectos'));
    }

    echo $respuesta;
}

if($post['accion'] == 'uno') {
    $id = (int) $post['id'];

    $sentencia = sprintf("SELECT * FROM proyectos WHERE id = %d", $id);
    
    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        $row = mysqli_fetch_assoc($rs);
        $proyecto = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'creacion' => $row['creacion'],
            'actualizacion' => $row['actualizacion']
        );
        $respuesta = json_encode(array('estado' => true, 'datos' => $proyecto));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Proyecto no encontrado'));
    }

    echo $respuesta;
}

if($post['accion'] == 'crear') {
    $nombre = mysqli_real_escape_string($mysqli, $post['nombre']);
    $descripcion = mysqli_real_escape_string($mysqli, $post['descripcion']);

    $sentencia = sprintf("INSERT INTO proyectos (nombre, descripcion) VALUES ('%s', '%s')", $nombre, $descripcion);

    $resultado = mysqli_query($mysqli, $sentencia);

    if ($resultado) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Proyecto creado exitosamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al crear el proyecto'));
    }
    echo $respuesta;
}

if($post['accion'] == 'actualizar') {
    $id = (int) $post['id']; // Asegúrate de que el ID sea un número
    $nombre = mysqli_real_escape_string($mysqli, $post['nombre']);
    $descripcion = mysqli_real_escape_string($mysqli, $post['descripcion']);

    $sentencia = sprintf("UPDATE proyectos SET nombre='%s', descripcion='%s' WHERE id = %d", 
                         $nombre, $descripcion, $id);

    $resultado = mysqli_query($mysqli, $sentencia);

    if ($resultado) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Proyecto actualizado exitosamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar el proyecto'));
    }
    echo $respuesta;
}

if($post['accion'] == 'eliminar') {
    $id = (int) $post['id'];

    $sentencia = sprintf("UPDATE proyectos SET estado = 0 WHERE id = %d", $id);

    $resultado = mysqli_query($mysqli, $sentencia);

    if ($resultado) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Proyecto eliminado exitosamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar el proyecto'));
    }

    echo $respuesta;
}

?>