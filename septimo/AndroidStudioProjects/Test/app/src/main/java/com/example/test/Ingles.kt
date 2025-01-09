package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.CheckBox
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class Ingles : AppCompatActivity() {
    // Elements
    private lateinit var preguntaText: TextView
    private lateinit var opcion1Check: RadioButton
    private lateinit var opcion2Check: RadioButton
    private lateinit var opcion3Check: RadioButton
    private lateinit var opcion4Check: RadioButton
    private lateinit var radioGroup: RadioGroup
    private lateinit var siguienteButton: Button


    // Cuestionario
    val cuestionario = arrayOf(
        Pregunta(
            "¿Cuál es el sinónimo de 'happy'?",
            "sad",
            "joyful",
            "angry",
            "tired",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué significa 'bicycle'?",
            "coche",
            "bicicleta",
            "barco",
            "avión",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál es el antónimo de 'big'?",
            "small",
            "large",
            "huge",
            "giant",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Qué palabra es un adjetivo?",
            "run",
            "happiness",
            "quick",
            "swim",
            false,
            true,
            true,
            false
        ),
        Pregunta(
            "¿Cómo se dice 'hola' en inglés?",
            "goodbye",
            "hi",
            "please",
            "thank you",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué significa 'apple'?",
            "plátano",
            "manzana",
            "naranja",
            "pera",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál de estas palabras es un pronombre?",
            "dog",
            "cat",
            "she",
            "book",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cómo se dice 'gracias' en inglés?",
            "sorry",
            "thank you",
            "excuse me",
            "please",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál es el plural de 'child'?",
            "children",
            "childs",
            "childes",
            "childrens",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Qué significa 'dog' en inglés?",
            "gato",
            "perro",
            "conejo",
            "pájaro",
            false,
            true,
            false,
            false
        )
    )

    // Variables
    var iterador: Int = 0
    var correctas: Int = 0
    var incorrectas: Int = 0
//    var calificacion: Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_ingles)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Asignar valores elementos
        preguntaText = findViewById(R.id.preguntaText2)
        opcion1Check = findViewById(R.id.opcion1)
        opcion2Check = findViewById(R.id.opcion2)
        opcion3Check = findViewById(R.id.opcion3)
        opcion4Check = findViewById(R.id.opcion4)
        radioGroup = findViewById(R.id.radioGroup)
        siguienteButton = findViewById(R.id.siguienteButton2)

        // Primera iteracion
        this.IterarCuestionario()


        // Button Siguiente
        siguienteButton.setOnClickListener {

            if (this.iterador == (this.cuestionario.size - 1)) {
                // Revisar y obtener el valor de la pregunta
                this.calificarPregunta()

                val intent = Intent(this, Resultados::class.java)
                intent.putExtra("titulo", "Resultado de ingles")
                intent.putExtra("correctas", this.correctas)
                intent.putExtra("incorrectas", this.incorrectas)
                intent.putExtra("calificacion", Test.ingles)
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

        var valorPregunta = 0.0
        // TODO: Calcular si hay punto o no


        // Calcular puntuación
        for (i in seleccionUsuario.indices) {
            if(respuestasCorrectas[i] && respuestasCorrectas[i] == seleccionUsuario[i]) {
                valorPregunta++
                this.correctas++
            }
        }


        // Asegurar que el valor no sea negativo
        if (valorPregunta != 1.0) this.incorrectas++

        // Sumar al puntaje global
        Test.ingles += valorPregunta
    }

    fun limpiarOpciones() {
        radioGroup.clearCheck()
    }
}