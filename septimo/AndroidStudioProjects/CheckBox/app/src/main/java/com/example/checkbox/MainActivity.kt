package com.example.checkbox

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val nombreText = findViewById<TextView>(R.id.nombreText)
        val apellidoText = findViewById<TextView>(R.id.apellidoText)
        val ingresarButton = findViewById<Button>(R.id.ingresarButton)

        ingresarButton.setOnClickListener{
            val f2 = Intent(this, Formulario::class.java)
            f2.putExtra("nombre", nombreText.text.toString())
            f2.putExtra("apellido", apellidoText.text.toString())
            startActivity(f2)
        }
    }
}