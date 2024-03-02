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
      "../../controllers/blogs.controllers.php?op=todos",
      (ListUsuarios) => {
        ListUsuarios = JSON.parse(ListUsuarios);
        $.each(ListUsuarios, (index, blog) => {
          html += `<tr>
              <td>${index + 1}</td>
              <td>${blog.nombre}</td>
              <td>${blog.tema}</td>
              <td>${blog.visitas}</td>
              <td>${blog.fecha_creacion}</td>
              <td>
              <button class='btn btn-primary' data-bs-toggle="modal" data-bs-target="#ModalAutores" onclick="CargaAutores(${blog.id})">Agregar</button>
              <button class='btn btn-warning' onclick='autoresBlog(${
                        blog.id
                      })'>Listar</button>
              <td>
              <button class='btn btn-primary' click='uno(${
                        blog.id
                      })'>Editar</button>
              <button class='btn btn-warning' click='eliminar(${
                        blog.id
                      })'>Eliminar</button>
                          `;
                    });
                    $("#ListaUsuarios").html(html);
      }
    );
  };

  var CargaAutores = (blogId) => {
    var html = "";
    $.get(
      "../../controllers/usuarios.controllers.php?op=todos-autores",
      (ListUsuarios) => {
        ListUsuarios = JSON.parse(ListUsuarios);
        $.each(ListUsuarios, (index, usuario) => {
          html += `<tr onclick="agregarAutorBlog(${blogId}, ${usuario.id})">
              <td>${index + 1}</td>
              <td>${usuario.nombre}</td>
              <td>${usuario.apellido}</td>
              <td>${usuario.email}</td>
              <td>${usuario.nacionalidad}</td>
              <td>${usuario.genero == 1 ? "Hombre": "Mujer"}</td>`;
        });
        $("#ListaAutores").html(html);
      }
    );
  };

// var agregarAutorBlog = (blogId, usuariosId) => {
//     var accion = "../../controllers/blogs_usuarios.controllers.php?op=insertar";
  
//     $.ajax({
//       url: accion,
//       type: "post",
//       data: { blogId: blogId, usuariosId: usuariosId }, // Convierte el objeto en una cadena JSON
//       processData: false,
//       contentType: false,
//       cache: false,
//       success: (respuesta) => {
//         console.log(respuesta);
//         // respuesta = JSON.parse(respuesta);
//         // if (respuesta == "ok") {
//         //   alert("Se guardo con éxito");
//         //   $("#ModalAutores").modal("hide");
//         // } else {
//         //   alert("Error al guardar");
//         // }
//       },
//     });
// }

async function agregarAutorBlog(blogId, usuarioId) {

  return new Promise((resolve, reject) => {
    $.ajax({
      url: "../../controllers/blogs_usuarios.controllers.php?op=insertar",
      type: "post",
      data: { blogId: blogId, usuarioId: usuarioId },
      success: async (respuesta) => {
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          alert("Se guardo con éxito");
          $("#ModalAutores").modal("hide");
        } else {
          alert("Error al guardar");
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });

}
  
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

  // Lista a los autores de un blog
  var autoresBlog = (blogId) => {
    return new Promise((resolve, reject) => {
      var html;
      $.ajax({
        url: "../../controllers/blogs_usuarios.controllers.php?op=todos-usuarios",
        type: "POST",
        contentType: "application/json", // Indica que el cuerpo de la solicitud es JSON
        data: JSON.stringify({ blogId: blogId }), // Convierte el objeto en una cadena JSON
        success: async function(ListaAutores) {
          ListaAutores = JSON.parse(ListaAutores);
          $.each(ListaAutores, (index, autor) => {
            html += `<div>${autor.nombre}</div>`;
          });
          await $("#prueba").html(html);
          resolve();
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  };


  // var autoresBlog = () => {
  //     var html;
  //     $.ajax({
  //       url: "../../controllers/blogs_usuarios.controllers.php?op=todos-usuarios",
  //       type: "POST",
  //       contentType: "application/json", // Indica que el cuerpo de la solicitud es JSON
  //       data: JSON.stringify({ blogId: 1 }),
  //       processData: false,
  //       contentType: false,
  //       cache: false,
  //       success: (ListaAutores) => {
  //         console.log(ListaAutores)
  //         $.each(ListaAutores, (index, autor) => {
  //           html += `<div>${autor.nombre}</div>`;
  //         });
  //         $("#prueba").html(html);
  //       }
  //     });
  //   }

  var uno = () => {};
  
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