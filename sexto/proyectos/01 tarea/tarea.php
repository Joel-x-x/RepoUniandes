<?php

// a. Declaración de variables
  $edad = 15;
  $pi = 3.14;
  $nombre = "Joel";
  $activo = true;
  $animales = ["🦇", "🐯", "🐧"];
  
  echo $edad . " <br> ";
  echo $pi . " <br> "; 
  echo $nombre . " <br> ";
  echo $activo . " <br> ";
  foreach($animales as $key => $animal) {
    echo $animal . " <br> ";
  }

// b. Operaciones Aritméticas
  $suma = $edad + $pi;
  $multiplicacion = $edad * $pi;

  echo "Suma: " . $suma . " <br> ";
  echo "Multiplicación: " . $multiplicacion . " <br> ";

  //  c. Manipulación de Cadenas
  $cancion = "La herida";
  $autor = "Heroes del silencio";

  $cancionConAutor = $cancion . " - " . $autor;
  echo "Longitud: " . strlen($cancionConAutor) . " <br> ";

  // d. Uso de Condicionales
  $mayorEdad = true;

  if($mayorEdad = true) {
    echo "Puede pasar <br> ";
  } else {
    echo "No puede pasar <br> ";
  }

  // e. Creación de un Array
  $emojis = array("😀", "😎", "🤑", "🧐", "👾");

  echo ("Emojis: " . $emojis[4] . " <br> ");

?>
