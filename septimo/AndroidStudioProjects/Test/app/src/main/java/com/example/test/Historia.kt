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

class Historia : AppCompatActivity() {

    // Elements
    private lateinit var preguntaText4: TextView
    private lateinit var opcion1Check: CheckBox
    private lateinit var opcion2Check: CheckBox
    private lateinit var opcion3Check: CheckBox
    private lateinit var opcion4Check: CheckBox
    private lateinit var siguienteButton4: Button


    // Cuestionario
    val cuestionario = arrayOf(
        Pregunta(
            "¿Cuáles de estos eventos ocurrieron durante la Independencia del Ecuador?",
            "La Batalla de Pichincha",
            "La muerte de Atahualpa",
            "El primer grito de independencia en Quito",
            "La firma de la Constitución de 1830",
            true,
            false,
            true,
            false
        ),
        Pregunta(
            "¿Qué territorios formaron parte del Ecuador antes de su independencia?",
            "Quito",
            "Guayaquil",
            "Cuenca",
            "Perú",
            true,
            true,
            true,
            false
        ),
        Pregunta(
            "¿Quién fue el primer presidente de la República del Ecuador?",
            "José Joaquín de Olmedo",
            "Antonio Borrero",
            "Juan José Flores",
            "Gabriel García Moreno",
            false,
            true,
            true,
            false
        ),
        Pregunta(
            "¿Cuáles son las principales causas de la independencia del Ecuador?",
            "Descontento con el dominio español",
            "Revoluciones en otras colonias latinoamericanas",
            "La invasión francesa a España",
            "La independencia de México",
            true,
            true,
            true,
            false
        ),
        Pregunta(
            "¿Qué personajes fueron parte de la Revolución de 1809 en Quito?",
            "Eloy Alfaro",
            "Juan de Salinas",
            "José de Antepara",
            "Manuela Sáenz",
            false,
            true,
            true,
            false
        ),
        Pregunta(
            "¿Qué países fueron los principales aliados del Ecuador durante la guerra con Colombia en el siglo XIX?",
            "Perú",
            "Bolivia",
            "Chile",
            "Argentina",
            true,
            false,
            false,
            false
        ),
        Pregunta(
            "¿Cuáles fueron las reformas impulsadas por Eloy Alfaro durante la Revolución Liberal?",
            "La secularización del Estado",
            "La abolición de la esclavitud",
            "La construcción de ferrocarriles",
            "La creación de universidades públicas",
            true,
            false,
            true,
            true
        ),
        Pregunta(
            "¿Qué personajes históricos fueron considerados próceres de la independencia ecuatoriana?",
            "José de Sucre",
            "Antonio José de Sucre",
            "Simón Bolívar",
            "Francisco de Miranda",
            true,
            false,
            true,
            false
        ),
        Pregunta(
            "¿Qué provincias conformaban el Ecuador antes de la creación de la República en 1830?",
            "Quito",
            "Guayaquil",
            "Azuay",
            "Carchi",
            true,
            true,
            false,
            false
        ),
        Pregunta(
            "¿Qué eventos marcaron el fin de la Guerra del Cenepa?",
            "El Tratado de Paz de 1999",
            "La victoria militar del Ecuador",
            "La intervención de la OEA",
            "La firma de la paz en Brasilia",
            false,
            true,
            true,
            true
        )
    )


    // Variables
    var iterador: Int = 0
    var correctas: Int = 0
    var incorrectas: Int = 0
    var calificacion: Double = 0.0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_historia)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Asignar valores elementos
        preguntaText4 = findViewById(R.id.preguntaText4)
        opcion1Check = findViewById(R.id.opcion1Check4)
        opcion2Check = findViewById(R.id.opcion2Check4)
        opcion3Check = findViewById(R.id.opcion3Check4)
        opcion4Check = findViewById(R.id.opcion4Check4)
        siguienteButton4 = findViewById(R.id.siguienteButton4)

        // Primera iteracion
        this.IterarCuestionario()


        // Button Siguiente
        siguienteButton4.setOnClickListener {

            if (this.iterador == (this.cuestionario.size - 1)) {
                // Revisar y obtener el valor de la pregunta
                this.calificarPregunta()

                val intent = Intent(this, Resultados::class.java)
                intent.putExtra("titulo", "Resultado de historia de Ecuador")
                intent.putExtra("correctas", this.correctas)
                intent.putExtra("incorrectas", this.incorrectas)
                intent.putExtra("calificacion", Test.historia)
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

        preguntaText4.text = pregunta.pregunta
        opcion1Check.text = pregunta.opcion1
        opcion2Check.text = pregunta.opcion2
        opcion3Check.text = pregunta.opcion3
        opcion4Check.text = pregunta.opcion4

        // Valida si ya no hay más opciones
        if (this.iterador == (this.cuestionario.size - 1)) {
            siguienteButton4.text = "Finalizar" // Finalizar test
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
        Test.historia += valorPregunta
    }

    fun limpiarOpciones() {
        opcion1Check.isChecked = false
        opcion2Check.isChecked = false
        opcion3Check.isChecked = false
        opcion4Check.isChecked = false
    }
}