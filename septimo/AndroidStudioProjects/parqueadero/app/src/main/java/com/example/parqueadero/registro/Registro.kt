package com.example.parqueadero.registro

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.parqueadero.R
import com.example.parqueadero.detalle.DetalleActivity
import com.example.parqueadero.retrofit.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Suppress("DEPRECATION")
class Registro : AppCompatActivity() {
    lateinit var registrosLista: ListView
    lateinit var registroButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_registro)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        registrosLista = findViewById<ListView>(R.id.listaRegistros)
        registroButton = findViewById<Button>(R.id.registroButton)

        this.listarRegistros()

        // Nuevo registro
        registroButton.setOnClickListener {
            RegistroGeneral.limpiarDatos()
            val intent = Intent(this@Registro, DetalleActivity::class.java)
            startActivity(intent)
        }
    }

    /**
    *
    * Listar registros
    *
    **/

    private fun listarRegistros() {
        val call = RetrofitClient.instance.listarRegistros()

        call.enqueue(object : Callback<List<RegistroData>> {
            override fun onResponse(call: Call<List<RegistroData>>, response: Response<List<RegistroData>>) {
                if(response.isSuccessful) {
                    response.body()?.let { manejarListaRegistros(it.toList()) }
                } else {
                    Toast.makeText(this@Registro, "No se pudo obtener los registros", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<List<RegistroData>>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@Registro, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }

    /**
     *
     * Manejar registros en la lista
     *
     **/

    private fun manejarListaRegistros(registros: List<RegistroData>) {
        val datosVisibles = registros.map { registro ->
            if(registro.salida == null) {
                "Entrada: ${registro.entrada}\nVehículo: ${registro.marca} Placa: ${registro.placa}"
            } else {
                "Entrada: ${registro.entrada}\nVehículo: ${registro.marca} Placa: ${registro.placa}\nSalida: ${registro.salida}"
            }
        }

        val adapter = object : ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, datosVisibles) {
            override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
                val view = super.getView(position, convertView, parent)

                // Condicional para cambiar el color
                val registro = registros[position]
                if (registro.salida == null) {
                    // Por ejemplo, si el campo "total" es mayor que 1, cambia el color de fondo
                    view.setBackgroundColor(ContextCompat.getColor(context, R.color.white))
                } else {
                    // Si no, usa otro color
                    view.setBackgroundColor(ContextCompat.getColor(context, R.color.gris))
                }

                return view
            }
        }

        this.registrosLista.adapter = adapter

        this.registrosLista.setOnItemClickListener { _, _, position, _ ->
            val registroSeleccionado = registros[position]

            // Limpiar registro general
            RegistroGeneral.limpiarDatos()

            // Asignar datos del registro general
            // Asignar los valores de registroSeleccionado a RegistroGeneral con valores por defecto
            RegistroGeneral.id = registroSeleccionado.id ?: 0
            RegistroGeneral.entrada = registroSeleccionado.entrada.ifEmpty { "" }
            RegistroGeneral.salida = registroSeleccionado.salida ?: ""
            RegistroGeneral.total = registroSeleccionado.total ?: 0.0
            RegistroGeneral.vehiculo_id = registroSeleccionado.vehiculo_id
            RegistroGeneral.cliente_id = registroSeleccionado.cliente_id
            RegistroGeneral.placa = registroSeleccionado.placa.ifEmpty { "" }
            RegistroGeneral.marca = registroSeleccionado.marca.ifEmpty { "" }
            RegistroGeneral.modelo = registroSeleccionado.modelo.ifEmpty { "" }
            RegistroGeneral.color = registroSeleccionado.color.ifEmpty { "" }
            RegistroGeneral.nombre_completo = registroSeleccionado.nombre_completo.ifEmpty { "" }
            RegistroGeneral.identificacion = registroSeleccionado.identificacion.ifEmpty { "" }
            RegistroGeneral.telefono = registroSeleccionado.telefono.ifEmpty { "" }

            // Abrir detalle
            val intent  = Intent(this, DetalleActivity::class.java)
            startActivity(intent)

//            val mensaje = """
//            ID: ${registroSeleccionado.id}
//            Entrada: ${registroSeleccionado.entrada}
//            Salida: ${registroSeleccionado.salida ?: "No registrada"}
//            Vehículo: ${registroSeleccionado.marca} ${registroSeleccionado.modelo}
//            Placa: ${registroSeleccionado.placa}
//            Cliente: ${registroSeleccionado.nombre_completo}
//            Identificacion: ${registroSeleccionado.identificacion}
//            Total: ${registroSeleccionado.total ?: 0}
//        """.trimIndent()
//
//            Toast.makeText(this, mensaje, Toast.LENGTH_LONG).show()
        }
    }

}