package com.example.list

import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
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

        var list = findViewById<ListView>(R.id.lista)

        val ciudades = arrayOf("Quito", "Ambato", "Puyo", "Riobamba", "Guayaquil", "Latacunga")

        val adaptador = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, ciudades)
        list.adapter = adaptador

        list.setOnItemClickListener { adapterView, view, i, l ->
            Toast.makeText(applicationContext, "Ciudad: " + ciudades[i], Toast.LENGTH_SHORT).show()
        }
    }
}