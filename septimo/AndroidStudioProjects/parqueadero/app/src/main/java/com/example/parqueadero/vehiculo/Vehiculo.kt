package com.example.parqueadero.vehiculo

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.parqueadero.R
import com.example.parqueadero.detalle.DetalleActivity
import com.example.parqueadero.registro.RegistroGeneral
import com.example.parqueadero.retrofit.RetrofitClient
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class Vehiculo : AppCompatActivity() {
    lateinit var vehiculosLista: ListView
    lateinit var marca: EditText
    lateinit var modelo: EditText
    lateinit var placa: EditText
    lateinit var color: EditText
    lateinit var vehiculoButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_vehiculo)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Inicialización de vistas
        vehiculosLista = findViewById(R.id.vehiculosLista)
        marca = findViewById(R.id.marcaText)
        modelo = findViewById(R.id.modeloText)
        placa = findViewById(R.id.placaVehiculoText)
        color = findViewById(R.id.colorVehiculoText)
        vehiculoButton = findViewById(R.id.agregarVehiculoButton)

        // Cargar los vehículos
        this.listarVehiculos()

        // Agregar un nuevo vehículo
        vehiculoButton.setOnClickListener {
            this.agregarVehiculo(VehiculoData(null, marca.text.toString(), modelo.text.toString(), placa.text.toString(), color.text.toString()))
        }
    }

    /**
     * Listar vehículos
     */
    private fun listarVehiculos() {
        val call = RetrofitClient.instance.listarVehiculos()

        call.enqueue(object : Callback<List<VehiculoData>> {
            override fun onResponse(call: Call<List<VehiculoData>>, response: Response<List<VehiculoData>>) {
                if (response.isSuccessful) {
                    response.body()?.let { manejarListaVehiculos(it.toList()) }
                } else {
                    Toast.makeText(this@Vehiculo, "No se pudo obtener los vehículos", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<List<VehiculoData>>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@Vehiculo, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }

    /**
     * Manejar vehículos en la lista
     */
    private fun manejarListaVehiculos(vehiculos: List<VehiculoData>) {
        val datosVisibles = vehiculos.map { vehiculo ->
            "${vehiculo.marca}\n ${vehiculo.modelo}\nPlaca: ${vehiculo.placa} Color: ${vehiculo.color}"
        }

        val adapter = object : ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, datosVisibles) {
            override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
                val view = super.getView(position, convertView, parent)

                if (position % 2 == 0) {
                    // Por ejemplo, si el campo "total" es mayor que 1, cambia el color de fondo
                    view.setBackgroundColor(ContextCompat.getColor(context, R.color.white))
                } else {
                    // Si no, usa otro color
                    view.setBackgroundColor(ContextCompat.getColor(context, R.color.gris))
                }

                return view
            }
        }

        // Asignar el adaptador inicialmente
        this.vehiculosLista.adapter = adapter

        this.vehiculosLista.setOnItemClickListener { _, _, position, _ ->
            val vehiculoSeleccionado = vehiculos[position]

            // Regresar al Detalle
            val intent = Intent(this, DetalleActivity::class.java)
            intent.putExtra("vehiculo", vehiculoSeleccionado)
            startActivity(intent)

            // Agregar a la clase estatica
            RegistroGeneral.vehiculo_id = vehiculoSeleccionado.id!!
            RegistroGeneral.marca = vehiculoSeleccionado.marca
            RegistroGeneral.modelo = vehiculoSeleccionado.modelo
            RegistroGeneral.placa = vehiculoSeleccionado.placa
            RegistroGeneral.color = vehiculoSeleccionado.color
        }
    }

    /**
     * Agregar vehículo
     */
    private fun agregarVehiculo(vehiculo: VehiculoData) {
        val call = RetrofitClient.instance.crearVehiculo(vehiculo)

        call.enqueue(object : Callback<VehiculoResponse> {
            override fun onResponse(call: Call<VehiculoResponse>, response: Response<VehiculoResponse>) {
                if (response.isSuccessful) {
                    val vehiculoResponse = response.body()
                    if (vehiculoResponse != null && vehiculoResponse.status) {
                        Toast.makeText(this@Vehiculo, "Vehículo agregado correctamente", Toast.LENGTH_LONG).show()
                        listarVehiculos() // Recarga la lista de vehículos
                    } else {
                        Toast.makeText(this@Vehiculo, vehiculoResponse?.message ?: "Error desconocido", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@Vehiculo, "No se pudo agregar el vehículo", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<VehiculoResponse>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@Vehiculo, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }
}
