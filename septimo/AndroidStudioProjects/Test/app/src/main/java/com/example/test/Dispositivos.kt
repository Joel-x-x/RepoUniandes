package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.RadioButton
import android.widget.RadioGroup
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class Dispositivos : AppCompatActivity() {
    // Elements
    private lateinit var preguntaText5: TextView
    private lateinit var opcion1Check: RadioButton
    private lateinit var opcion2Check: RadioButton
    private lateinit var opcion3Check: RadioButton
    private lateinit var opcion4Check: RadioButton
    private lateinit var radioGroup: RadioGroup
    private lateinit var siguienteButton5: Button


    // Cuestionario
// Cuestionario
    val cuestionario = arrayOf(
        Pregunta(
            "¿Cuál de estos es un sistema operativo para dispositivos móviles?",
            "Windows",
            "Android",
            "Linux",
            "Mac OS",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué es un 'smartphone'?",
            "Un teléfono fijo",
            "Un dispositivo móvil con funciones avanzadas",
            "Un teléfono con cámara",
            "Una computadora portátil",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué marca produce el iPhone?",
            "Samsung",
            "Apple",
            "Huawei",
            "LG",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué es un 'touchscreen'?",
            "Una pantalla que usa botones físicos",
            "Una pantalla táctil",
            "Un dispositivo de sonido",
            "Un tipo de red inalámbrica",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué significa '4G' en telefonía móvil?",
            "Cuarta generación de redes móviles",
            "Cuarta versión de un sistema operativo",
            "Un tipo de pantalla",
            "Una marca de teléfonos",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Qué es un 'tablet'?",
            "Una computadora portátil pequeña",
            "Un dispositivo móvil de pantalla táctil más grande que un teléfono",
            "Un teléfono con teclado",
            "Una marca de dispositivos",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué es 'Bluetooth' en un dispositivo móvil?",
            "Una red para navegar en Internet",
            "Un tipo de conexión inalámbrica",
            "Un sistema operativo",
            "Un servicio de almacenamiento en la nube",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Cuál es la principal función de la cámara en un teléfono móvil?",
            "Tomar fotos y videos",
            "Realizar llamadas",
            "Escuchar música",
            "Conectar a Internet",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Qué es una 'app'?",
            "Un tipo de computadora",
            "Una aplicación para dispositivos móviles",
            "Un servicio de correo electrónico",
            "Un componente del hardware",
            false,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué es el sistema operativo 'iOS'?",
            "Un sistema operativo para computadoras",
            "Un sistema operativo exclusivo para iPhone y iPad",
            "Un sistema de gestión de redes",
            "Un software de edición de imágenes",
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

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_dispositivos)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Asignar valores elementos
        preguntaText5 = findViewById(R.id.preguntaText5)
        opcion1Check = findViewById(R.id.opcion1)
        opcion2Check = findViewById(R.id.opcion2)
        opcion3Check = findViewById(R.id.opcion3)
        opcion4Check = findViewById(R.id.opcion4)
        radioGroup = findViewById(R.id.radioGroup)
        siguienteButton5 = findViewById(R.id.siguienteButton5)

        // Primera iteracion
        this.IterarCuestionario()


        // Button Siguiente
        siguienteButton5.setOnClickListener {

            if (this.iterador == (this.cuestionario.size - 1)) {
                // Revisar y obtener el valor de la pregunta
                this.calificarPregunta()

                val intent = Intent(this, Resultados::class.java)
                intent.putExtra("titulo", "Resultado de dispositivos")
                intent.putExtra("correctas", this.correctas)
                intent.putExtra("incorrectas", this.incorrectas)
                intent.putExtra("calificacion", Test.dispositivos)
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

        preguntaText5.text = pregunta.pregunta
        opcion1Check.text = pregunta.opcion1
        opcion2Check.text = pregunta.opcion2
        opcion3Check.text = pregunta.opcion3
        opcion4Check.text = pregunta.opcion4

        // Valida si ya no hay más opciones
        if (this.iterador == (this.cuestionario.size - 1)) {
            siguienteButton5.text = "Finalizar" // Finalizar test
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
        Test.dispositivos += valorPregunta
    }

    fun limpiarOpciones() {
        radioGroup.clearCheck()
    }
}