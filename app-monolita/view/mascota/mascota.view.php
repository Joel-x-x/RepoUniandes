<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mascotas lista</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>

    <script src="./mascota.model.js"></script>
    <script src="./mascota.controller.js"></script>
</head>

<body class=".bg-info-subtle">
    <header>
        <h1 class="text-center mb-4">Tus mascotas</h1>
    </header>

    <main class="container">
        <table class="table table-responsive table-bordered table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Color</th>
                    <th>Sexo</th>
                    <th>Tipo</th>
                    <th>Raza</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody id="tablamascotas">

            </tbody>

        </table>
    </main>
</body>

</html>