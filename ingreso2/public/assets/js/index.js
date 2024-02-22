function init() {
  $("#frm").on("submit", (e) => {
    RegistroAsistencia(e);
  });
}

$().ready(() => {
  tiposacceso();
});

var RegistroAsistencia = (e) => {
  e.preventDefault();
  var formulario = new FormData($("#frm")[0]);
  alert("aqui");
  $.ajax({
    url: "controllers/usuario.controllers.php?op=unoconCedula",
    type: "post",
    data: formulario,
    processData: false,
    contentType: false,
    cache: false,
    success: (respuesta) => {
      console.log(respuesta);
    },
  }).done((usuarioId) => {
    usuarioId = JSON.parse(usuarioId);
    formulario.append("usuariosId", usuarioId.idUsuarios);
    $.ajax({
      url: "controllers/accesos.controllers.php?op=insertar",
      type: "post",
      data: formulario,
      processData: false,
      contentType: false,
      cache: false,
      success: (respuesta) => {
        console.log(respuesta);
        respuesta = JSON.parse(respuesta);
        if (respuesta == "ok") {
          //Swal.fire(Titulo, texto, tipo de alerta)
          Swal.fire("Registro de Asistencia", "Se guardo con éxito", "success");
        } else {
          Swal.fire(
            "Registro de Asistencia",
            "Hubo un error al guardar",
            "danger"
          );
        }
      },
    });
  });
};

var tiposacceso = () => {
  return new Promise((resolve, reject) => {
    var html = `<option value="0">Seleccione una opción</option>`;
    $.post("controllers/tipoacceso.controllers.php?op=todos", async (lista) => {
      lista = JSON.parse(lista);
      $.each(lista, (index, tipo) => {
        html += `<option value="${tipo.IdTipoAcceso}">${tipo.Detalle}</option>`;
      });
      await $("#tipo").html(html);
      resolve();
    }).fail((error) => {
      reject(error);
    });
  });
};
init();

// Deteccion de rostro utilizando webcam
const video = document.querySelector("video");
let imagenAlmacenada;

document.addEventListener("DOMContentLoaded", (e) => {
  let stream;

  const MODEL_URL = "./public/libs/face-api/models"

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

async function almacenarRostro() {
  imagenAlmacenada = await capturarRostro();
  console.log("Imagen detectada")
}

// Función para iniciar la autenticación facial
async function compararRostros() {
  nuevaImagenBase64 = await capturarRostro();

  // Convertir las imágenes base64 en tensores
  const tensor1 = await faceapi.fetchImage(imagenAlmacenada);
  const tensor2 = await faceapi.fetchImage(nuevaImagenBase64);

  // Detectar los rostros en ambas imágenes
  const detection1 = await faceapi.detectSingleFace(tensor1).withFaceLandmarks().withFaceDescriptor();
  const detection2 = await faceapi.detectSingleFace(tensor2).withFaceLandmarks().withFaceDescriptor();

  if (!detection1 || !detection2) {
    return "No se pudieron detectar los rostros en una o ambas imágenes.";
  }

  // Crear faceMatcher con el descriptor del rostro almacenado
  const faceMatcher = new faceapi.FaceMatcher([detection1.descriptor]);

  // Encontrar el mejor match en la nueva imagen
  const mejorMatch = faceMatcher.findBestMatch(detection2.descriptor);

  // Retornar el mensaje indicando si los rostros son iguales o no
  console.log(mejorMatch);
  if (mejorMatch._label === "unknown") {
    alert("Los rostros son diferentes.")
  } else {
    alert("Los rostros son iguales.")
  }
}

// Detectar sonriza
video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)

  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)

  setInterval(async () => {
      const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender()

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      // faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      // Dibujar género
      resizedDetections.forEach(detection => {
          const { age, gender, genderProbability } = detection
          const roundedAge = Math.round(age)
          const roundedGenderProbability = Math.round(genderProbability * 100) / 100 // Redondear a 2 decimales
          new faceapi.draw.DrawTextField(
              [
                  `${roundedAge} years`,
                  `${gender} (${roundedGenderProbability})`
              ],
              detection.detection.box.bottomLeft
          ).draw(canvas)
      });
  }, 10)
})


