function init() {
    $("#form_usuarios").on("submit", (e) => {
      GuardarEditar(e);
    });
  }
  
  $().ready(() => {
    CargaLista();
  });
  
  var CargaLista = () => {
    var html = "";
    $.get(
      "../../controllers/usuarios.controllers.php?op=todos-autores",
      (ListUsuarios) => {
        ListUsuarios = JSON.parse(ListUsuarios);
        $.each(ListUsuarios, (index, usuario) => {
          html += `<tr>
              <td>${index + 1}</td>
              <td>${usuario.nombre}</td>
              <td>${usuario.apellido}</td>
              <td>${usuario.email}</td>
              <td>${usuario.rol}</td>
              <td>${usuario.nacionalidad}</td>
              <td>${usuario.nacimiento}</td>
              <td>${usuario.genero == 1 ? "Hombre": "Mujer"}</td>
  <td>
  <button class='btn btn-primary' click='uno(${
            usuario.id
          })'>Editar</button>
  <button class='btn btn-warning' click='eliminar(${
            usuario.id
          })'>Eliminar</button>
              `;
        });
        $("#ListaUsuarios").html(html);
      }
    );
  };
  
  var GuardarEditar = (e) => {
    e.preventDefault();
    var DatosFormularioUsuario = new FormData($("#form_usuarios")[0]);
    var accion = "../../controllers/usuarios.controllers.php?op=insertar-autor";
  
    for (var pair of DatosFormularioUsuario.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  
    
    $.ajax({
      url: accion,
      type: "post",
      data: DatosFormularioUsuario,
      processData: false,
      contentType: false,
      cache: false,
      success: (respuesta) => {
        console.log(respuesta);
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          alert("Se guardo con éxito");
          CargaLista();
          LimpiarCajas();
        } else {
          alert("Error al guardar");
        }
      },
    });
  };
  
  var uno = () => {};
  
  var roles = () => {
    return new Promise((resolve, reject) => {
      var html;
      $.post(
        "../../controllers/roles.controllers.php?op=autor",
        async (rol) => {
          rol = JSON.parse(rol);
          html += `<option value="${rol.id}">${rol.nombre}</option>`;
          await $("#rol").html(html);
          resolve();
        }
      ).fail((error) => {
        reject(error);
      });
    });
  };
  
  var eliminar = () => {};
  
  var LimpiarCajas = () => {
    (document.getElementById("nombre").value = ""),
      (document.getElementById("apellido").value = ""),
      (document.getElementById("email").value = ""),
      (document.getElementById("clave").value = ""),
      (document.getElementById("nacionalidad").value = ""),
      (document.getElementById("nacimiento").value = ""),
      (document.getElementById("genero").value = ""),
      $("#ModalUsuarios").modal("hide");
  };
  init();