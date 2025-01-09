package com.example.parqueadero.cliente

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

class Cliente : AppCompatActivity() {
    lateinit var clientesLista: ListView
    lateinit var nombre: EditText
    lateinit var identificacion: EditText
    lateinit var telefono: EditText
    lateinit var clienteButton: Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_cliente)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        clientesLista = findViewById(R.id.clientesLista)
        nombre = findViewById(R.id.nombreClienteText)
        identificacion = findViewById(R.id.identificacionClienteText)
        telefono = findViewById(R.id.telefonoClienteText)
        clienteButton = findViewById(R.id.agregarClienteButton)

        this.listarClientes()

        // Agregar nuevo cliente
        clienteButton.setOnClickListener {
            this.agregarCliente(ClienteData(null, nombre.text.toString(), identificacion.text.toString(), telefono.text.toString()));
        }
    }

    /**
     *
     * Listar clientes
     *
     **/
    private fun listarClientes() {
        val call = RetrofitClient.instance.listarClientes()

        call.enqueue(object : retrofit2.Callback<List<ClienteData>> {
            override fun onResponse(call: Call<List<ClienteData>>, response: Response<List<ClienteData>>) {
                if(response.isSuccessful) {
                    response.body()?.let { manejarListaClientes(it.toList()) }
                } else {
                    Toast.makeText(this@Cliente, "No se pudo obtener los clientes", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<List<ClienteData>>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@Cliente, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }

    /**
     *
     * Manejar clientes en la lista
     *
     **/

    private fun manejarListaClientes(clientes: List<ClienteData>) {
        val datosVisibles = clientes.map { cliente ->
            "${cliente.nombre_completo}\nIdentificacion: ${cliente.identificacion}\nTeléfono: ${cliente.telefono}"
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
        this.clientesLista.adapter = adapter

        this.clientesLista.setOnItemClickListener { _, _, position, _ ->
            val clienteSeleccionado = clientes[position]

            // Regresar al Detalle
            val intent = Intent(this, DetalleActivity::class.java)
            intent.putExtra("cliente", clienteSeleccionado)
            startActivity(intent)

            // Agregar a la clase estatica
            RegistroGeneral.cliente_id = clienteSeleccionado.id!!
            RegistroGeneral.nombre_completo = clienteSeleccionado.nombre_completo
            RegistroGeneral.identificacion = clienteSeleccionado.identificacion
            RegistroGeneral.telefono = clienteSeleccionado.telefono
        }
    }
    /**
     *
     * Agregar cliente
     *
     **/
    private fun agregarCliente(cliente: ClienteData) {
        val call = RetrofitClient.instance.crearCliente(cliente)

        call.enqueue(object : Callback<ClienteResponse> {
            override fun onResponse(call: Call<ClienteResponse>, response: Response<ClienteResponse>) {
                if (response.isSuccessful) {
                    val clienteResponse = response.body()
                    if (clienteResponse != null && clienteResponse.status) {
                        Toast.makeText(this@Cliente, "Cliente agregado correctamente", Toast.LENGTH_LONG).show()
                        listarClientes() // Recarga la lista de clientes
                    } else {
                        Toast.makeText(this@Cliente, clienteResponse?.message ?: "Error desconocido", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@Cliente, "No se pudo agregar el cliente", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<ClienteResponse>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@Cliente, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }


}