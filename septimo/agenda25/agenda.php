<?php
include 'cors.php';
include 'config.php';

$post = json_decode(file_get_contents('php://input'), true);

if($post['accion'] == 'login') {
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s' AND clave_persona = '%s' AND bloqueado <> 0", $post['usuario'], $post['clave']);

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
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona = '%s'", $post['cedula']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'La cédula ya existe.'));
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
    if (mysqli_num_rows($rs) > 0) {
        while ($row = mysqli_fetch_array($rs)) {
            $datos[] = array(
              'codigo' => $row['cod_contacto'],
              'nombre' => $row['nom_contacto'],
              'telefono' => $row['telefono_contacto'],
            );
        }
        $respuesta = json_encode(array('estado' => true,'data' => $datos));
    } else {

        $respuesta = json_encode(array('estado' => false,'mensaje' => "No hay contactos"));
    }
    echo $respuesta;

}

if($post['accion'] == 'nuevo-contacto') {
    $sentencia = sprintf("INSERT INTO contacto (nom_contacto, ape_contacto, telefono_contacto, email_contacto, persona_cod_persona) VALUES ('%s', '%s', '%s', '%s', '%s')", $post['nombre'], $post['apellido'], $post['telefono'], $post['correo'], $post['cod_persona']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Contacto creado satisfactoriamente"));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al crear el contacto"));
    }

    echo $respuesta;
}

if($post['accion'] == 'actualizar-persona') {
    $sentencia = sprintf("UPDATE persona SET nom_persona = '%s', ape_persona = '%s', correo_persona = '%s' WHERE cod_persona = '%s'", $post['nombre'], $post['apellido'], $post['correo'], $post['codigo']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array('estado' => true, "mensaje" => "Persona actualizada."));
    } else {
        $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al actualizar la persona."));
    }

    echo $respuesta;
}

if($post['accion'] == 'datos-persona') {
    $sentencia = sprintf("SELECT * FROM persona WHERE cod_persona = '%s'", $post['codigo']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array('estado' => true, 'data' => mysqli_fetch_assoc($rs)));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al obtener los datos de la persona'));
    }

    echo $respuesta;
}

if($post['accion'] == 'confirmar-datos') {
    $sentencia = sprintf("SELECT * FROM persona WHERE pregunta1 = '%s' AND pregunta2 = '%s'", $post['pregunta1'], $post['pregunta2']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        $respuesta = json_encode(array('estado' => true));
    } else {
        $respuesta = json_encode(array('estado' => false));
    }
    echo $respuesta;
}

if($post['accion'] == 'cambiar-clave') {
    $sentencia = sprintf("UPDATE persona SET clave_persona = '%s' WHERE pregunta1 = '%s' AND pregunta2 = '%s'", $post['clave'], $post['pregunta1'], $post['pregunta2']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Clave cambiada correctamente'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al cambiar la clave'));
    }

    echo $respuesta;
}

if($post['accion'] == 'vtelefono') {
    $sentencia = sprintf("select cod_contacto from contacto where persona_cod_persona = '%s' and telefono_contacto = '%s'", $post['cod_persona'], $post['telefono']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'El teléfono ya existe.'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => ''));
    }

    echo $respuesta;
}

if($post['accion'] == 'acontacto') {
    $sentencia = sprintf("update contacto set nom_contacto = '%s', ape_contacto = '%s', telefono_contacto = '%s', email_contacto = '%s' where cod_contacto = '%s'", $post['nombre'], $post['apellido'], $post['telefono'], $post['correo'], $post['codigo']);

    $rs = mysqli_query($mysqli, $sentencia);
    if($rs) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Datos actualizados correctamente.'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar los datos.'));
    }

    echo $respuesta;
}

if($post['accion'] == 'dcontacto') {
    $sentencia = sprintf("select * from contacto where cod_contacto = '%s'", $post['codigo']);

    $rs = mysqli_query($mysqli, $sentencia);

    if(mysqli_num_rows($rs) > 0) {
        while($row = mysqli_fetch_array($rs)) {
            $datos = array(
                'nombre' => $row ['nom_contacto'],
                'apellido' => $row ['ape_contacto'],
                'telefono' => $row ['telefono_contacto'],
                'correo' => $row ['email_contacto'],
            );
        }
        $respuesta = json_encode(array('estado' => true, 'datos' => $datos));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al obtener los datos.'));
    }

    echo $respuesta;
}

if($post['accion'] == 'econtacto') {
    $sentencia = sprintf("delete from contacto where cod_contacto = '%s'", $post['codigo']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array(
            'estado' => true,
            'mensaje' => 'Contacto eliminado correctamente.'
        ));
    } else {
        $respuesta = json_encode(array(
            'estado' => false,
            'mensaje' => 'Error al eliminar el contacto.'
        ));
    }

    echo $respuesta;
}

if($post['accion'] == 'bloquear') {
    $sentencia = sprintf("update persona set bloqueado = 0 where ci_persona = '%s'", $post['usuario']);

    $rs = mysqli_query($mysqli, $sentencia);

    if($rs) {
        $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Usuario bloqueado correctamente.'));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al bloquear el usuario.'));
    }

    echo $respuesta;
}

?>