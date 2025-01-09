package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class Menu : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_menu)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Elements
        val matematicasButton = findViewById<Button>(R.id.matematicasButton)
        val inglesButton = findViewById<Button>(R.id.inglesButton)
        val informaticaButton = findViewById<Button>(R.id.informaticaButton)
        val historiaButton = findViewById<Button>(R.id.historiaButton)
        val dispositivosButton = findViewById<Button>(R.id.dispositivosButton)
        val resultadosButton = findViewById<Button>(R.id.resultadosButton)
        val nuevoIntento = findViewById<Button>(R.id.nuevoIntentoButton)

        matematicasButton.setOnClickListener {
            // Resetear la nota
            Test.matematicas = 0.0

            val intent = Intent(this, Matematicas::class.java)
            startActivity(intent)
        }

        inglesButton.setOnClickListener {
            // Resetear la nota
            Test.ingles = 0.0

            val intent = Intent(this, Ingles::class.java)
            startActivity(intent)
        }
        informaticaButton.setOnClickListener {
            // Resetear la nota
            Test.informatica = 0.0

            val intent = Intent(this, Informatica::class.java)
            startActivity(intent)
        }
        historiaButton.setOnClickListener {
            // Resetear la nota
            Test.historia = 0.0

            val intent = Intent(this, Historia::class.java)
            startActivity(intent)
        }
        dispositivosButton.setOnClickListener {
            // Resetear la nota
            Test.dispositivos = 0.0

            val intent = Intent(this, Dispositivos::class.java)
            startActivity(intent)
        }
        resultadosButton.setOnClickListener {
            // Resetear la nota
            Test.dispositivos = 0.0

            val intent = Intent(this, ResultadosFinales::class.java)
            startActivity(intent)
        }


    }
}