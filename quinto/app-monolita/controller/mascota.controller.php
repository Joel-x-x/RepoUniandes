<?php
error_reporting(0);
require_once('../model/mascota.model.php');

$usuarios = new ClaseMascotas;


switch ($_GET['op']) {
    case 'todos':
        $datos = array();
        $datos = $usuarios->todos();
        while ($fila = mysqli_fetch_assoc($datos)) {
            $todos[] = $fila;
        }
        echo json_encode($todos);
        break;
}
/**
 * 
 * GET    => URL externo
 * POST   => envio de datos por interno
 * 
 * 
 */
