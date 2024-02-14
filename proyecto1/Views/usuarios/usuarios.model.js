class Clase_usuario_js {
  constructor(usuario, ruta) {
    this.usuario = usuario;
    this.ruta = ruta;
  }

  todos() {
    var html = "";
    $.get(
      "../../Controllers/usuarios.controller.php?op=" + this.ruta,
      (res) => {
        console.log(res);
        res = JSON.parse(res);
        $.each(res, (index, usuario) => {
          html += `<tr>
            <td>${index + 1}</td>
            <td>${usuario.Nombres}</td>
            <td>${usuario.Apellidos}</td>
            <td>${usuario.Correo}</td>
            <td>${usuario.Password}</td>
            <td>${usuario.rol}</td>
            <td><button class='btn btn-success' onclick='uno(${
              usuario.UsuarioId
            })'>Editar</button>
            <button class='btn btn-danger'>Eliminar</button> </td>
            </tr>`;
        });
        console.log(html);
        $("#tablausuarios").html(html);
      }
    );
  }

  uno(usuarioId) {
    $.post(
      "../../Controllers/usuarios.controller.php?op=" + this.ruta,
      { UsuarioId: usuarioId },
      (user) => {
        console.log({ conPOO: user });
      }
    );
  }
  insertar() {
    $.ajax({
      url: '../../Controllers/usuarios.controller.php?op=" + this.ruta',
      type: "POST",
      data: this.usuario,
      processData: false,
      contentType: false,
      cache: false,
      success: (res) => {
        res = JSON.parse(res);
        if (res) {
          alert("se guardo");
        } else {
          alert("error al guardar");
        }
      },
    });
  }
}
