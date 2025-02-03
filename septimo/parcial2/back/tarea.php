<?php
include 'cors.php';
include 'config.php';
error_reporting(0);

$post = json_decode(file_get_contents('php://input'), true);

if($post['accion'] == 'listar-tareas') {
    $proyecto_id = (int) $post['proyecto_id'];

    $sentencia = sprintf("SELECT * FROM tareas WHERE proyecto_id = %d ORDER BY creacion ASC", $proyecto_id);
    
    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_assoc($rs)) {
           $tareas[] = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'estado' => $row['estado'],
            'creacion' => $row['creacion'],
            'actualizacion' => $row['actualizacion']
           );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $tareas));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No hay tareas para este proyecto'));
    }

    echo $respuesta;
}

if($post['accion'] == 'uno') {
    $id = (int) $post['id'];

    $sentencia = sprintf("SELECT * FROM tareas WHERE id = %d", $id);
    
    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        $row = mysqli_fetch_assoc($rs);
        $tarea = array(
            'id' => $row['id'],
            'nombre' => $row['nombre'],
            'descripcion' => $row['descripcion'],
            'estado' => $row['estado'],
            'creacion' => $row['creacion'],
            'actualizacion' => $row['actualizacion'],
            'proyecto_id' => $row['proyecto_id']
        );
        $respuesta = json_encode(array('estado' => true, 'datos' => $tarea));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Tarea no encontrada'));
    }

    echo $respuesta;
}


if($post['accion'] == 'crear') {
    $nombre = mysqli_real_escape_string($mysqli, $post['nombre']);
    $descripcion = mysqli_real_escape_string($mysqli, $post['descripcion']);
    $estado = mysqli_real_escape_string($mysqli, $post['estado']);
    $proyecto_id = (int) $post['proyecto_id'];

    $sentencia = sprintf("INSERT INTO tareas (nombre, descripcion, estado, proyecto_id) VALUES ('%s', '%s', '%s', %d)", 
                         $nombre, $descripcion, $estado, $proyecto_id);

    $resultado = mysqli_query($mysqli, $sentencia);

    if ($resultado) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Tarea creada exitosamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al crear la tarea'));
    }
    echo $respuesta;
}

if($post['accion'] == 'actualizar') {
    $id = (int) $post['id'];
    $nombre = mysqli_real_escape_string($mysqli, $post['nombre']);
    $descripcion = mysqli_real_escape_string($mysqli, $post['descripcion']);
    $estado = mysqli_real_escape_string($mysqli, $post['estado']);

    $sentencia = sprintf("UPDATE tareas SET nombre='%s', descripcion='%s', estado='%s' WHERE id = %d", 
                         $nombre, $descripcion, $estado, $id);

    $resultado = mysqli_query($mysqli, $sentencia);

    if ($resultado) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Tarea actualizada exitosamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar la tarea'));
    }
    echo $respuesta;
}

if($post['accion'] == 'eliminar') {
    $id = (int) $post['id'];

    $sentencia = sprintf("DELETE FROM tareas WHERE id = %d", $id);

    $resultado = mysqli_query($mysqli, $sentencia);

    if ($resultado) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Tarea eliminada exitosamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al eliminar la tarea'));
    }
    echo $respuesta;
}

?>