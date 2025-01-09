class ClaseMascota {
  constructor(mascota, ruta) {
    this.mascota = mascota;
    this.ruta = ruta;
  }

  todos() {
    var html = "";
    $.get(
      "../../controller/mascota.controller.php?op=" + this.ruta,
      (res) => {
        console.log(res);
        res = JSON.parse(res);
        $.each(res, (index, mascota) => {
          html += `<tr>
            <td>${index + 1}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.color}</td>
            <td>${mascota.sexo}</td>
            <td>${mascota.tipo}</td>
            <td>${mascota.raza}</td>
            <td><button class='btn btn-outline-info' onclick='uno(${
              mascota.id
            })'>Editar</button>
            <button class='btn btn-outline-danger'>Eliminar</button> </td>
            </tr>`;
        });
        console.log(html);
        $("#tablamascotas").html(html);
      }
    );
  }

}
