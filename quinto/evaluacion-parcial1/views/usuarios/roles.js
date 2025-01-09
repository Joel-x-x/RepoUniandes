function init() {
    $("#form_roles").on("submit", (e) => {
      GuardarEditar(e);
    });
  }
  
  $().ready(() => {
    CargaLista();
  });
  
  var CargaLista = () => {
    var html = "";
    $.get(
      "../../controllers/roles.controllers.php?op=todos",
      (lisroles) => {
        lisroles = JSON.parse(lisroles);
        $.each(lisroles, (index, roles) => {
          html += `<tr>
              <td>${index + 1}</td>
              <td>${usuario.Nombre}</td>
             
  <td>
  <button class='btn btn-primary' click='uno(${
            usuario.Userrol
          })'>Editar</button>
  <button class='btn btn-warning' click='eliminar(${
            usuario.Userrol
          })'>Editar</button>
              `;
        });
        $("#lisroles").html(html);
      }
    );
  };
  //guardar 
  var GuardarEditar = (e) => {
    e.preventDefault();
    var DatosFormularioroles = new FormData($("#form_roles")[0]);
    var accion = "../../controllers/roles.controllers.php?op=insertar";
  
    for (var pair of DatosFormularioroles.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  
    
    $.ajax({
      url: accion,
      type: "post",
      data: DatosFormularioroles,
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
            html += `<option value="${rol.RolID}">${rol.Nombre_Rol}</option>`;
          });
          await $("#RolID").html(html);
          resolve();
        }
      ).fail((error) => {
        reject(error);
      });
    });
  };
  
  var eliminar = () => {};
  
  var LimpiarCajas = () => {
    (document.getElementById("Nombres").value = ""),
      $("#Modalroles").modal("hide");
  };
  init();