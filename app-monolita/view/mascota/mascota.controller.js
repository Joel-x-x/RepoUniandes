function init() {
  // $("#usuarios_Form").on("submit", (e) => {
  //   insertar(e);
  // });
}
$().ready(() => {
  cargarTabla();
});

var cargarTabla = () => {
  var mascotasModelo = new ClaseMascota("", "todos");
  mascotasModelo.todos();
};

// var uno = (usuarioId) => {
//   var mascotasModelo = new ClaseMascotas("", "uno");
//   mascotasModelo.uno(usuarioId);
// };

// var insertar = (e) => {
//   e.preventDefault();
//   var usaurio_form = new FormData($("#usuarios_Form")[0]);
//   var mascotasModelo = new ClaseMascotas(usaurio_form, "insertar");
//   mascotasModelo.insertar();
// };

init();
