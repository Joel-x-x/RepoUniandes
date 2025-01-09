package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class Informatica : AppCompatActivity() {

    // Elements
    private lateinit var preguntaText: TextView
    private lateinit var lista: ListView
    private lateinit var siguienteButton: Button


    // Cuestionario
    val cuestionario = arrayOf(
        Pregunta(
            "¿Qué es un sistema operativo?",
            "Un software de edición de imágenes",
            "Un programa que gestiona el hardware y software de un ordenador",
            "Un dispositivo de almacenamiento",
            "Una red de computadoras",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál de estos lenguajes es utilizado para crear aplicaciones móviles en Android?",
            "Swift",
            "Java",
            "Python",
            "Ruby",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué significa HTTP?",
            "Hyper Text Transfer Protocol",
            "High Text Transmission Protocol",
            "Hyper Transfer Text Protocol",
            "Hyper Tool Text Protocol",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Qué es un algoritmo?",
            "Una herramienta para programar interfaces gráficas",
            "Un conjunto de reglas para resolver un problema",
            "Un tipo de lenguaje de programación",
            "Un dispositivo de almacenamiento externo",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál es el propósito de un antivirus?",
            "Proteger el sistema de virus y malware",
            "Acelerar la velocidad de la computadora",
            "Monitorear el rendimiento del procesador",
            "Crear copias de seguridad de los archivos",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué significa 'IP' en redes de computadoras?",
            "Internet Protocol",
            "Internal Protocol",
            "Intelligent Protocol",
            "Interconnected Protocol",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Qué hace el comando 'mkdir' en una terminal?",
            "Crea un nuevo archivo",
            "Elimina un archivo",
            "Crea un nuevo directorio o carpeta",
            "Muestra el contenido de una carpeta",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué es el almacenamiento en la nube?",
            "Un tipo de memoria RAM",
            "Almacenamiento de datos en servidores a través de Internet",
            "Una unidad de almacenamiento físico en la computadora",
            "Un sistema de respaldo de energía para computadoras",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál de estos es un sistema de gestión de bases de datos?",
            "Photoshop",
            "Excel",
            "MySQL",
            "Windows",
            false,
            false,
            true,
            false
        ),
        Pregunta(
            "¿Qué significa la abreviatura 'URL'?",
            "Uniform Resource Locator",
            "Unified Resource Locator",
            "Universal Resource Locator",
            "Uniform Rate Locator",
            true,
            false,
            false,
            false
        )
    )


    // Variables
    var iterador: Int = 0
    var correctas: Int = 0
    var incorrectas: Int = 0
    var indicePreguntaSeleccionada: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_informatica)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Asignar valores elementos
        preguntaText = findViewById(R.id.preguntaText3)
        lista = findViewById(R.id.lista)
        siguienteButton = findViewById(R.id.siguienteButton3)

        // Primera iteracion
        this.IterarCuestionario()
        
        // Opción seleccionada
        lista.setOnItemClickListener { parent, view, i, l ->
            this.indicePreguntaSeleccionada = i;
        }

        // Button Siguiente
        siguienteButton.setOnClickListener {

            if (this.iterador == (this.cuestionario.size - 1)) {
                // Revisar y obtener el valor de la pregunta
                this.calificarPregunta()

                val intent = Intent(this, Resultados::class.java)
                intent.putExtra("titulo", "Resultado de informática")
                intent.putExtra("correctas", this.correctas)
                intent.putExtra("incorrectas", this.incorrectas)
                intent.putExtra("calificacion", Test.informatica)
                startActivity(intent)
            } else {
                // Revisar y obtener el valor de la pregunta
                this.calificarPregunta()
//                Toast.makeText(applicationContext, "Valor: " + Test.matematicas, Toast.LENGTH_SHORT)
//                    .show()
                // Itera
                this.iterador++

                this.IterarCuestionario()
            }
        }
    }

    fun IterarCuestionario() {
        this.limpiarOpciones()
        // Pregunta actual
        var pregunta: Pregunta = this.cuestionario[this.iterador]

        preguntaText.text = pregunta.pregunta

        // Agregar datos a la lista
        val datos = mutableListOf(pregunta.opcion1, pregunta.opcion2, pregunta.opcion3, pregunta.opcion4)
        val adaptador = ArrayAdapter(this, android.R.layout.simple_list_item_1, datos)
        lista.adapter = adaptador

        // Valida si ya no hay más opciones
        if (this.iterador == (this.cuestionario.size - 1)) {
            siguienteButton.text = "Finalizar" // Finalizar test
        }
    }

    fun calificarPregunta() {
        // Pregunta actual
        val pregunta = cuestionario[this.iterador]

        // Respuestas correctas
        val respuestasCorrectas = listOf(
            pregunta.check1,
            pregunta.check2,
            pregunta.check3,
            pregunta.check4
        )

        var valorPregunta = 0.0

        // Calcular puntuación
        for (i in respuestasCorrectas.indices) {
            if(respuestasCorrectas[i] && i == this.indicePreguntaSeleccionada) {
                valorPregunta++
                this.correctas++
            }
        }


        // Asegurar que el valor no sea negativo
        if (valorPregunta != 1.0) this.incorrectas++

        // Sumar al puntaje global
        Test.informatica += valorPregunta
    }

    fun limpiarOpciones() {
        this.indicePreguntaSeleccionada = 5 // Número que no esta en el rango de opciones
    }

}