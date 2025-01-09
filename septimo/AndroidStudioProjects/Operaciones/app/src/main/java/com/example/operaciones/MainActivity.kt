package com.example.operaciones

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

        var n1Text = findViewById<TextView>(R.id.n1Text)
        var n2Text = findViewById<TextView>(R.id.n2Text)
        var sumaButton = findViewById<Button>(R.id.sumarButton)
        var resultadoText = findViewById<TextView>(R.id.resultadoText)

        sumaButton.setOnClickListener {
            var n1 = n1Text.text.toString().toInt()
            var n2 = n2Text.text.toString().toInt()
            var r = n1 + n2;
            resultadoText.text = r.toString();

        }
    }
}