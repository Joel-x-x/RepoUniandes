function init() {
    $("#form_usuarios").on("submit", (e) => {
      GuardarEditar(e);
    });
  }


  
  $().ready(() => {
    CargaLista();
    // Obtener la fecha actual
    let today = new Date();

    // Restar un día
    today.setDate(today.getDate() - 1);

    // Formatear la fecha en el formato YYYY-MM-DD
    let formattedDate = today.toISOString().split('T')[0];

    // Establecer la fecha en el campo de entrada
    document.getElementById('date').value = formattedDate;
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
              <button class='btn btn-dark' data-bs-toggle="modal" data-bs-target="#ModalAutores" onclick="CargaAutores(${blog.id})">Agregar</button>
              <button class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#ModalAutoresBlogs" onclick='CargaAutoresBlog(${blog.id})'>Listar</button>
              <td>
              <button class='btn btn-dark' click='uno(${
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

    // Lista a los autores de un blog
  var CargaAutoresBlog = (blogId) => {
    return new Promise((resolve, reject) => {
      var html;
      $.ajax({
        url: "../../controllers/blogs_usuarios.controllers.php?op=todos-usuarios",
        type: "POST",
        // contentType: "application/json", // Indica que el cuerpo de la solicitud es JSON
        // data: JSON.stringify({ blogId: blogId }), // Convierte el objeto en una cadena JSON
        data:{ blogId: blogId }, // Convierte el objeto en una cadena JSON
        success: async function(ListaAutores) {
          console.log(ListaAutores)
          ListaAutores = JSON.parse(ListaAutores);
          $.each(ListaAutores, (index, autor) => {
            html += `<tr>
            <td>${index + 1}</td>
            <td>${autor.nombre}</td>
            <td>${autor.apellido}</td>
            <td>${autor.email}</td>
            <td>${autor.nacionalidad}</td>
            <td>${autor.genero == 1 ? "Hombre": "Mujer"}</td>`;
          });
          await $("#ListaAutoresBlogs").html(html);
          resolve();
        },
        error: function(error) {
          reject(error);
        }
      });
    });
  };


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
    var accion = "../../controllers/blogs.controllers.php?op=insertar";
  
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
      (document.getElementById("tema").value = ""),
      $("#ModalUsuarios").modal("hide");
  };
  init();