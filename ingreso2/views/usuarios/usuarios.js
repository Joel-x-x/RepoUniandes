function init() {
  $("#form_usuarios").on("submit", (e) => {
    GuardarEditar(e);
  });
}

$().ready(() => {
  CargaLista();
  // $("#contenedor-canvas").hide();
});

var CargaLista = () => {
  var html = "";
  $.get(
    "../../controllers/usuario.controllers.php?op=todos",
    (ListUsuarios) => {
      ListUsuarios = JSON.parse(ListUsuarios);
      $.each(ListUsuarios, (index, usuario) => {
        html += `<tr>
            <td>${index + 1}</td>
            <td>${usuario.Nombres}</td>
            <td>${usuario.Apellidos}</td>
            <td>${usuario.Rol}</td>
            <td>${usuario.Nombre}</td>
<td>
<button class='btn btn-primary' click='uno(${
          usuario.idUsuarios
        })'>Editar</button>
<button class='btn btn-warning' click='eliminar(${
          usuario.idUsuarios
        })'>Editar</button>
            `;
      });
      $("#ListaUsuarios").html(html);
    }
  );
};

var GuardarEditar = (e) => {
  e.preventDefault();
  var DatosFormularioUsuario = new FormData($("#form_usuarios")[0]);
  DatosFormularioUsuario.append("Face", obtenerImagen())
  var accion = "../../controllers/usuario.controllers.php?op=insertar";

  for (var pair of DatosFormularioUsuario.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  /**
   * if(SucursalId >0){editar   accion='ruta para editar'}
   * else
   * { accion = ruta para insertar}
   */
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
        alert("no tu pendejada");
      }
    },
  });
};

var uno = () => {};

var sucursales = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post(
      "../../controllers/sucursal.controllers.php?op=todos",
      async (ListaSucursales) => {
        ListaSucursales = JSON.parse(ListaSucursales);
        $.each(ListaSucursales, (index, sucursal) => {
          html += `<option value="${sucursal.SucursalId}">${sucursal.Nombre}</option>`;
        });
        await $("#SucursalId").html(html);
        resolve();
      }
    ).fail((error) => {
      reject(error);
    });
  });
};

var roles = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post(
      "../../controllers/rol.controllers.php?op=todos",
      async (ListaRoles) => {
        ListaRoles = JSON.parse(ListaRoles);
        $.each(ListaRoles, (index, rol) => {
          html += `<option value="${rol.idRoles}">${rol.Rol}</option>`;
        });
        await $("#RolId").html(html);
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
    (document.getElementById("Apellidos").value = ""),
    (document.getElementById("Correo").value = ""),
    (document.getElementById("contrasenia").value = ""),
    $("#ModalUsuarios").modal("hide");
};
init();

// Deteccion de rostro utilizando webcam
const video = document.querySelector("video");
let imagenAlmacenada;

document.addEventListener("DOMContentLoaded", (e) => {
  
  let stream;
  
  const MODEL_URL = "./../../public/libs/face-api/models"

  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL)
  ]).then(startVideo);

  function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;
        stream = stream;
      },
      () => alert("Error al acceder a la camara web")
    );
  }
});

video.addEventListener("play", async () => {
  const intervalId = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks();
    if (detections.length > 0) {
      clearInterval(intervalId); // Detener el intervalo
      await obtenerImagen();
    }
  }, 1000);

});

async function capturarRostro() {
  // Crear un canvas temporal para capturar el rostro
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  
  // Establecer las dimensiones del canvas igual a las dimensiones del video
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  
  // Dibujar el video en el canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Capturar la imagen en formato base64
  const imagenBase64 = canvas.toDataURL("image/jpeg");
  // Devolver la imagen en formato base64
  return imagenBase64 
}

async function obtenerImagen() {
  let imagen = await capturarRostro();
  console.log("Imagen detectada")
  console.log(imagen)
  return imagen
}
