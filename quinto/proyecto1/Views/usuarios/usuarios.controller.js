function init() {
  $("#usuarios_Form").on("submit", (e) => {
    insertar(e);
  });
}
$().ready(() => {
  cargarTabla();
});

var cargarTabla = () => {
  var usuariosModelojs = new Clase_usuario_js("", "todos");
  usuariosModelojs.todos();
};

var uno = (usuarioId) => {
  var usuariosModelojs = new Clase_usuario_js("", "uno");
  usuariosModelojs.uno(usuarioId);
};

var insertar = (e) => {
  e.preventDefault();
  var usaurio_form = new FormData($("#usuarios_Form")[0]);
  var usuariosModelojs = new Clase_usuario_js(usaurio_form, "insertar");
  usuariosModelojs.insertar();
};
init();
