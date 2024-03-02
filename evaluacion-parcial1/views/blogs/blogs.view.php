<?php require_once('../html/head2.php')  ?>

<!-- Basic Bootstrap Table -->
<!--onclick="sucursales(); roles()"-->
<div class="card">
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#ModalUsuarios">Nuevo Blog</button>
    <!-- <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#ModalAutores">Autores</button> -->

    <div id="prueba"></div>

    <h5 class="card-header">Lista de Blogs</h5>
    <div class="table-responsive text-nowrap">
        <table class="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Tema</th>
                    <th>Visitas</th>
                    <th>Fecha creación</th>
                    <th>Autor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody class="table-border-bottom-0" id="ListaUsuarios">

            </tbody>
        </table>
    </div>
</div>

<!-- Modal Autores-->
<div class="modal" tabindex="-1" id="ModalAutores">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Nacionalidad</th>
                        <th>Genero</th>
                    </tr>
                </thead>
                <tbody class="table-border-bottom-0" id="ListaAutores">

                </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- Modal Usuarios-->
<div class="modal" tabindex="-1" id="ModalUsuarios">
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tituloModal"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="form_usuarios" method="post">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Ingrese sus nombres" require>
                    </div>
                    <div class="form-group">
                        <label for="apellido">Apellido</label>
                        <input type="text" name="apellido" id="apellido" class="form-control" placeholder="Ingrese sus apellidos" require>
                    </div>
                    <div class="form-group">
                        <label for="email">Correo Electrónico</label>
                        <input type="email" name="email" id="email" class="form-control" placeholder="Ingrese su Correo" require>
                    </div>
                    <div class="form-group">
                        <label for="clave">Contraseña</label>
                        <input type="password" name="clave" id="clave" class="form-control" placeholder="**********" require>
                    </div>
                    <div class="form-group">
                        <label for="nacionalidad">Nacionalidad</label>
                        <input type="text" name="nacionalidad" id="nacionalidad" class="form-control" placeholder="Ingrese sus nacionalidades" require>
                    </div>
                    <div class="form-group">
                        <label for="nacimiento">nacimiento</label>
                        <input type="date" name="nacimiento" id="nacimiento" class="form-control" placeholder="Ingrese sus nacimientos" require>
                    </div>
                    <div class="form-group">
                        <label for="genero">Genero</label>
                        <select id="genero" name="genero" class="form-control">
                            <option value="1">Hombre</option>
                            <option value="0">Mujer</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="rol">Rol</label>
                        <select id="rol" name="rol" class="form-control">
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Guardar</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
</div>






<?php require_once('../html/scripts2.php') ?>

<script src="./blogs.js"></script>