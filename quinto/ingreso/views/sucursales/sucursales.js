function init() {
  $("#form_sucursales").on("submit", (e) => {
    GuardarEditar(e);
  });
}

$().ready(() => {
  CargaLista();
});

var CargaLista = () => {
  var html = "";

  $.get("../../controllers/sucursal.controllers.php?op=todos",
  (ListSucursales) => {
    ListSucursales = JSON.parse(ListSucursales);
    $.each(ListSucursales, (index, sucursal) => {
      html += `<tr>
        <td>${index + 1}</td>
        <td>${sucursal.Nombre}</td>
        <td>${sucursal.Direccion}</td>
        <td>${sucursal.Telefono}</td>
        <td>${sucursal.Correo}</td>
        <td>${sucursal.Parroquia}</td>        
        <td>${sucursal.Canton}</td>
        <td>${sucursal.Provincia}</td>
        <td>
          <button class='btn btn-primary' click='uno(${
          sucursal.SucursalId
        })'>Editar</button>
          <button class='btn btn-warning' click='eliminar(${
          sucursal.SucursalId
        })'>Eliminar</button> </td>
      `; 
    });
    $("#ListaSucursales").html(html);
  });
};

var GuardarEditar = (e) => { 
  e.preventDefault();
  var DatosFormularioSucursal = new FormData($("#form_sucursales")[0]);
  var accion = "../../controllers/sucursal.controllers.php?op=insertar";
  
  for (var pair of DatosFormularioSucursal.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  $.ajax({
    url: accion,
    type: "post",
    data: DatosFormularioSucursal,
    processData: false,
    contentType: false,
    cache: false,
    success: (respuesta) => {
      console.log(respuesta);
      respuesta = JSON.parse(respuesta);
      if(respuesta == "ok") {
        alert("Se guardo con éxito");
        CargaLista();
        LimpiarCajas();
      } else {
        alert("no sirve tu pendejada");
      }
    },
  });
};

var LimpiarCajas = () => {
  (document.getElementById("Nombre").value = ""),
  (document.getElementById("Direccion").value = ""),
  (document.getElementById("Telefono").value = ""),
  (document.getElementById("Correo").value = ""),
  (document.getElementById("Parroquia").value = ""),
  (document.getElementById("Canton").value = ""),
  (document.getElementById("Provincia").value = "")
  $("#ModalSucursales").modal("hide");
};
init();