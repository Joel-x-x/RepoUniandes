package com.example.funciones

import android.os.Bundle
import android.widget.Button
import android.widget.Toast
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

        val verificarButton = findViewById<Button>(R.id.verificarButton)
        verificarButton.setOnClickListener {
            mensaje("Hola esta es una función")
            mensaje(suma(2, 3))
        }

    }

    fun mensaje(text: String) {
        Toast.makeText(applicationContext, text, Toast.LENGTH_SHORT).show()
    }

    fun suma(n1:Int, n2:Int): String {
        var respuesta = ""
        var r = n1 + n2
        respuesta = "La suma es: " + r
        return respuesta
    }

}