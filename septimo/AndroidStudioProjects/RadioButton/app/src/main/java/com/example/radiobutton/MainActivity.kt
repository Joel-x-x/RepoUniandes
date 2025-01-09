package com.example.radiobutton

import android.os.Bundle
import android.widget.RadioGroup
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

//        var sexo = "No selecciona"
//
//        val rg:RadioGroup = findViewById(R.id.rg) as RadioGroup
//        rg.setOnClickListener { radioGroup, i ->
//            sexo = when (i) {
//                R.id.masculinoRadioButton -> "Masculino"
//                R.id.femeninoRadioButton -> "Femenino"
//
//                else -> "No selecciona"
//            }
//        }
//        val btnverificarz id.btn_verificar)
//        btnverificar.setOnClickListener { it: Vicw!
//            Toast.makeText(applicationContext, sexo, Toast.LENGTH_SHORT) . show()
//    }
}