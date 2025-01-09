<?php
//TODO: Requerimientos 
require_once('../config/conexion.php');
class BlogUsuario
{
    /*TODO: Procedimiento para sacar todos los registros*/
    public function todosUsuarios($blogId)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "select u.* from blogs_usuarios bu join usuarios u on bu.usuario_id = u.id where bu.blog_id = $blogId";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }

    /*TODO: Procedimiento para sacar un registro*/
    public function uno($idUsuario)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT  * FROM rolusuariorelacion WHERE usuarioid = $idUsuario";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    /*TODO: Procedimiento para insertar */
    public function insertar($blogId, $usuarioId) { 
        // return $usuarioId;  
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "insert into blogs_usuarios(blog_id, usuario_id) values($blogId, $usuarioId)";
        if (mysqli_query($con, $cadena)) {
            return 'ok';
        } else {
            return 'Error al insertar en la base de datos';
        }
        $con->close();
    }
    /*TODO: Procedimiento para actualizar */
    public function Actualizar($Roles_idRoles,$Usuarios_idUsuarios,$IdRolUsuarioRelacionID)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "update rolusuariorelacion set RolID=$Roles_idRoles, UsuarioID =$Usuarios_idUsuarios where RolUsuarioRelacionID= $IdRolUsuarioRelacionID";
        if (mysqli_query($con, $cadena)) {
            return "ok";
        } else {
            return 'error al actualizar el registro';
        }
        $con->close();
    }
    /*TODO: Procedimiento para Eliminar */
    public function Eliminar($Usuarios_idUsuarios)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "DELETE FROM `rolusuariorelacion` WHERE `RolUsuarioRelacionID`= $Usuarios_idUsuarios";

        if (mysqli_query($con, $cadena)) {
            return 'ok';
        } else {
            return false;
        }
        $con->close();
    }
}
