package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.CheckBox
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class Matematicas : AppCompatActivity() {
    // Elements
    private lateinit var preguntaText: TextView
    private lateinit var opcion1Check: CheckBox
    private lateinit var opcion2Check: CheckBox
    private lateinit var opcion3Check: CheckBox
    private lateinit var opcion4Check: CheckBox
    private lateinit var siguienteButton: Button


    // Cuestionario
    val cuestionario = arrayOf(
        Pregunta(
            "¿Qué números son primos?",
            "2",
            "4",
            "5",
            "9",
            true,
            false,
            true,
            false
        ),
        Pregunta(
        "¿Cuáles son múltiplos de 3?",
        "6",
        "10",
        "15",
        "7",
        true,
        false,
        true,
        false
        ),
        Pregunta(
        "¿Qué números son pares?",
        "8",
        "11",
        "14",
        "13",
        true,
        false,
        true,
        false
        ),
        Pregunta(
        "¿Qué números tienen raíz cuadrada entera?",
        "4",
        "7",
        "9",
        "15",
        true,
        false,
        true,
        false
        ),
        Pregunta(
        "¿Qué números son menores que 10?",
        "5",
        "12",
        "8",
        "10",
        true,
        false,
        true,
        false
        ),
        Pregunta(
        "¿Qué fracciones equivalen a 1/2?",
        "2/4",
        "3/6",
        "1/3",
        "5/10",
        true,
        true,
        false,
        true
        ),
        Pregunta(
        "¿Qué operaciones tienen un resultado de 10?",
        "5 + 5",
        "20 - 5",
        "2 x 5",
        "12 - 2",
        true,
        false,
        true,
        true
        ),
        Pregunta(
        "¿Qué números tienen un dígito?",
        "7",
        "23",
        "5",
        "14",
        true,
        false,
        true,
        false
        ),
        Pregunta(
        "¿Qué números son divisibles entre 4?",
        "8",
        "12",
        "14",
        "15",
        true,
        true,
        false,
        false
        ),
        Pregunta(
        "¿Qué números son cuadrados perfectos?",
        "16",
        "25",
        "30",
        "36",
        true,
        true,
        false,
        true
        )
    )

    // Variables
    var iterador: Int = 0
    var correctas: Int = 0
    var incorrectas: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_matematicas)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Asignar valores elementos
        preguntaText = findViewById(R.id.preguntaText)
        opcion1Check = findViewById(R.id.opcion1Check4)
        opcion2Check = findViewById(R.id.opcion2Check4)
        opcion3Check = findViewById(R.id.opcion3Check4)
        opcion4Check = findViewById(R.id.opcion4Check4)
        siguienteButton = findViewById(R.id.siguienteButton)

        // Primera iteracion
        this.IterarCuestionario()


        // Button Siguiente
        siguienteButton.setOnClickListener {

            if (this.iterador == (this.cuestionario.size - 1)) {
                // Revisar y obtener el valor de la pregunta
                this.calificarPregunta()

                val intent = Intent(this, Resultados::class.java)
                intent.putExtra("titulo", "Resultado de matemáticas")
                intent.putExtra("correctas", this.correctas)
                intent.putExtra("incorrectas", this.incorrectas)
                intent.putExtra("calificacion", Test.matematicas)
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
        opcion1Check.text = pregunta.opcion1
        opcion2Check.text = pregunta.opcion2
        opcion3Check.text = pregunta.opcion3
        opcion4Check.text = pregunta.opcion4

        // Valida si ya no hay más opciones
        if (this.iterador == (this.cuestionario.size - 1)) {
            siguienteButton.text = "Finalizar" // Finalizar test
        }
    }

    fun calificarPregunta() {
        // Pregunta actual
        val pregunta = cuestionario[this.iterador]

        // Lista de checks seleccionados por el usuario
        val seleccionUsuario = listOf(
            opcion1Check.isChecked,
            opcion2Check.isChecked,
            opcion3Check.isChecked,
            opcion4Check.isChecked
        )

        // Respuestas correctas
        val respuestasCorrectas = listOf(
            pregunta.check1,
            pregunta.check2,
            pregunta.check3,
            pregunta.check4
        )

        // Peso de cada respuesta correcta
        val pesoCorrecta = 1.0 / respuestasCorrectas.count { it }
        val penalizacion = 0.2 // Penalización por opción incorrecta
        var valorPregunta = 0.0

        // Calcular puntuación
        for (i in seleccionUsuario.indices) {
            if (seleccionUsuario[i] == respuestasCorrectas[i]) {
                if (respuestasCorrectas[i]) {
                    valorPregunta += pesoCorrecta
                    // Respuestas correctas
                    this.correctas++
                }
            } else if (seleccionUsuario[i]) {
                valorPregunta -= penalizacion
                // Respuestas incorrectas
                this.incorrectas++
            }
        }

        // Asegurar que el valor no sea negativo
        if (valorPregunta < 0) valorPregunta = 0.0

        // Sumar al puntaje global
        Test.matematicas += valorPregunta

        if(Test.matematicas > 9.6) Test.matematicas = 10.0

    }

    fun limpiarOpciones() {
        opcion1Check.isChecked = false
        opcion2Check.isChecked = false
        opcion3Check.isChecked = false
        opcion4Check.isChecked = false
    }
}
