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
      "../../controllers/usuarios.controllers.php?op=todos",
      (ListUsuarios) => {
        ListUsuarios = JSON.parse(ListUsuarios);
        $.each(ListUsuarios, (index, usuario) => {
          html += `<tr>
              <td>${index + 1}</td>
              <td>${usuario.nombre}</td>
              <td>${usuario.email}</td>
              <td>${usuario.rol}</td>
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
    var accion = "../../controllers/usuarios.controllers.php?op=insertar";
  
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
      var html = `<option value="0">Seleccione una opción</option>`;
      $.post(
        "../../controllers/roles.controllers.php?op=todos",
        async (ListaRoles) => {
          ListaRoles = JSON.parse(ListaRoles);
          $.each(ListaRoles, (index, rol) => {
            html += `<option value="${rol.id}">${rol.nombre}</option>`;
          });
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
      (document.getElementById("email").value = ""),
      (document.getElementById("clave").value = ""),
      $("#ModalUsuarios").modal("hide");
  };
  init();