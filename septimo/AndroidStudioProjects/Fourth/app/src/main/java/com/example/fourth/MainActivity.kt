package com.example.fourth

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
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

        var n1Text = findViewById<EditText>(R.id.n1Text)
        var n2Text = findViewById<EditText>(R.id.n2Text)

        var sumarButton = findViewById<Button>(R.id.sumaButton)
        var restarButton = findViewById<Button>(R.id.restarButton)
        var multiplicarButton = findViewById<Button>(R.id.multiplicarButton)
        var dividirButton = findViewById<Button>(R.id.dividirButton)

        var resultado = findViewById<TextView>(R.id.resultadoText)

        fun getNumber(editText: EditText): Int {    return editText.text.toString().toIntOrNull() ?: 0}

        sumarButton.setOnClickListener {
//            resultado.text = getNumber(n1Text) + getNumber(n2Text)
        }
        restarButton.setOnClickListener {
//            resultado.text = (n1Text - n2Text).toString()
        }
        multiplicarButton.setOnClickListener {
//            resultado.text = (n1Text * n2Text).toString()
        }
        dividirButton.setOnClickListener {
//            resultado.text = (n1Text / n2Text).toString()
        }

    }
}