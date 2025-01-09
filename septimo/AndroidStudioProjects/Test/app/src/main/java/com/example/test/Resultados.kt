package com.example.test

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class Resultados : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_resultados)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Variables del intent
        val tituloRecibido = intent.getStringExtra("titulo")
        val correctasRecibido = intent.getIntExtra("correctas", 0)
        val incorrectasRecibido = intent.getIntExtra("incorrectas", 0)
        val calificacionRecibido = intent.getDoubleExtra("calificacion", 0.0)

        // Elementos
        val tituloText = findViewById<TextView>(R.id.tituloText)
        val correctasText = findViewById<TextView>(R.id.correctasText)
        val incorrectasText = findViewById<TextView>(R.id.incorrectasText)
        val calificacionText = findViewById<TextView>(R.id.calificacionText)
        val menuButton = findViewById<Button>(R.id.menuButton)

        tituloText.text = tituloRecibido
        correctasText.text = correctasRecibido.toString()
        incorrectasText.text = incorrectasRecibido.toString()
        calificacionText.text = calificacionRecibido.toString()

        menuButton.setOnClickListener {
            val intent = Intent(this, Menu::class.java)
            startActivity(intent)
        }

    }
}