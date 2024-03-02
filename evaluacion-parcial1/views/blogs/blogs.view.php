<?php require_once('../html/head2.php')  ?>

<!-- Basic Bootstrap Table -->
<!--onclick="sucursales(); roles()"-->
<div class="card">
    <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#ModalUsuarios">Nuevo Blog</button>
    <!-- <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#ModalAutoresBlogs">Autores</button> -->

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

<!-- Modal Autores Blogs-->
<div class="modal" tabindex="-1" id="ModalAutoresBlogs">
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
                <tbody class="table-border-bottom-0" id="ListaAutoresBlogs">

                </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


<!-- Modal Blogs-->
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
                        <input type="text" name="nombre" id="nombre" class="form-control" placeholder="Nombre del blog" require>
                    </div>
                    <div class="form-group">
                        <label for="tema">Tema</label>
                        <input type="text" name="tema" id="tema" class="form-control" placeholder="Tema del blog" require>
                    </div>
                    <div class="form-group">
                        <label for="date">Fecha Creacion</label>
                        <input type="date" name="date" id="date" class="form-control" require>
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