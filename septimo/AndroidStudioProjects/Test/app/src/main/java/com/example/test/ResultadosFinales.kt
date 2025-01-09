package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class ResultadosFinales : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_resultados_finales)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val nombreText2 = findViewById<TextView>(R.id.nombreText2)
        val matematicas = findViewById<TextView>(R.id.matematicasText)
        val ingles = findViewById<TextView>(R.id.inglesText)
        val informatica = findViewById<TextView>(R.id.informaticaText)
        val historia = findViewById<TextView>(R.id.historiaText)
        val dispositivos = findViewById<TextView>(R.id.dispositivosText)
        val menu2 = findViewById<Button>(R.id.menuButton2)
        val calificacionFinal = findViewById<TextView>(R.id.calificacionFinalText)

        menu2.setOnClickListener {
            val intent = Intent(this, Menu::class.java)
            startActivity(intent)
        }

        nombreText2.text = Test.nombre
        matematicas.text = String.format("%.2f", Test.matematicas)
        ingles.text = String.format("%.2f", Test.ingles)
        informatica.text = String.format("%.2f", Test.informatica)
        historia.text = String.format("%.2f", Test.historia)
        dispositivos.text = String.format("%.2f", Test.dispositivos)

        val calificacionFinalValue = (Test.matematicas + Test.ingles + Test.informatica + Test.historia + Test.dispositivos) / 5
        calificacionFinal.text = String.format("%.2f", calificacionFinalValue)



    }
}