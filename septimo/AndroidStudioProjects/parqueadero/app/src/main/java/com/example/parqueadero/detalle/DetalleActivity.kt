package com.example.parqueadero.detalle

import android.app.AlertDialog
import android.app.DatePickerDialog
import android.app.TimePickerDialog
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.parqueadero.R
import com.example.parqueadero.cliente.Cliente
import com.example.parqueadero.registro.Registro
import com.example.parqueadero.registro.RegistroData
import com.example.parqueadero.registro.RegistroEntradaData
import com.example.parqueadero.registro.RegistroGeneral
import com.example.parqueadero.registro.RegistroResponse
import com.example.parqueadero.registro.RegistroSalidaData
import com.example.parqueadero.retrofit.RetrofitClient
import com.example.parqueadero.vehiculo.Vehiculo
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.Calendar

@Suppress("DEPRECATION", "CAST_NEVER_SUCCEEDS")
class DetalleActivity : AppCompatActivity() {

    // Cliente
    lateinit var nombreText: TextView
    lateinit var identificacionText: TextView
    lateinit var telefonoText: TextView
    lateinit var clienteButton: Button
    // Vehiculo
    lateinit var vehiculoText: TextView
    lateinit var placaText: TextView
    lateinit var colorText: TextView
    lateinit var vehiculoButton: Button
    // Entrada
    lateinit var entradaDateText: EditText
    lateinit var entradaTimeText: EditText
    lateinit var entradaButton: Button
    // Salida
    lateinit var salidaDateText: EditText
    lateinit var salidaTimeText: EditText
    lateinit var salidaButton: Button

    // Registro
    lateinit var registroData: RegistroData

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_detalle)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        /*
        *
        * Mapeos
        *
        */

        // Cliente
        nombreText = findViewById(R.id.nombreText)
        identificacionText = findViewById(R.id.identificacionText)
        telefonoText = findViewById(R.id.telefonoText)
        clienteButton = findViewById(R.id.clienteButton)

        clienteButton.setOnClickListener {
            val intent = Intent(this, Cliente::class.java)
            startActivity(intent)
        }

        // Vehículo
        vehiculoText = findViewById(R.id.vehiculoText)
        placaText = findViewById(R.id.placaText)
        colorText = findViewById(R.id.colorText)
        vehiculoButton = findViewById(R.id.vehiculoButton)

        vehiculoButton.setOnClickListener {
            val intent = Intent(this, Vehiculo::class.java)
            startActivity(intent)
        }

        // Entrada
        entradaDateText = findViewById(R.id.entradaDateText)
        entradaTimeText = findViewById(R.id.entradaTimeText)
        entradaButton = findViewById(R.id.entradaButton)

        entradaButton.setOnClickListener {
            RegistroGeneral.entrada = entradaDateText.text.toString() + " " + entradaTimeText.text.toString()
            this.registrarEntrada()
        }

        // Salida
        salidaDateText = findViewById(R.id.salidaDateText)
        salidaTimeText = findViewById(R.id.salidaTimeText)
        salidaButton = findViewById(R.id.salidaButton)

        salidaButton.setOnClickListener {
            RegistroGeneral.salida = salidaDateText.text.toString() + " " + salidaTimeText.text.toString()
            this.registrarSalida()
        }

        /*
        *
        * Verificar registros generales
        *
        */

        // Verificar datos del registro general cliente
        if(!RegistroGeneral.nombre_completo.equals("")){
            nombreText.text = RegistroGeneral.nombre_completo
            identificacionText.text = "Id: " + RegistroGeneral.identificacion
            telefonoText.text = "Tel: " + RegistroGeneral.telefono
        }

        // Verificar datos del registro general vehiculo
        if(!RegistroGeneral.marca.equals("")){
            vehiculoText.text = RegistroGeneral.marca + " " + RegistroGeneral.modelo
            placaText.text = RegistroGeneral.placa
            colorText.text = RegistroGeneral.color
        }

        // Verificar datos del registro
        if(!RegistroGeneral.entrada.equals("")){
            entradaDateText.setText(RegistroGeneral.entrada.split(" ")[0])
            entradaTimeText.setText(RegistroGeneral.entrada.split(" ")[1])
        }
        if(!RegistroGeneral.salida.equals("")){
            salidaDateText.setText(RegistroGeneral.salida?.split(" ")?.get(0))
            salidaTimeText.setText(RegistroGeneral.salida?.split(" ")?.get(1))
        }

        /*
        *
        * Pickers de entrada
        *
        */
        entradaDateText.setOnClickListener {
            val calendar = Calendar.getInstance()
            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            val day = calendar.get(Calendar.DAY_OF_MONTH)

            val datePickerDialog = DatePickerDialog(
                this,
                { _, selectedYear, selectedMonth, selectedDay ->
                    // Formatea la fecha seleccionada
                    val formattedDate = "$selectedYear-${selectedMonth + 1}-$selectedDay"
                    entradaDateText.setText(formattedDate)
                },
                year, month, day
            )
            datePickerDialog.show()
        }

        entradaTimeText.setOnClickListener {
            val calendar = Calendar.getInstance()
            val hour = calendar.get(Calendar.HOUR_OF_DAY)
            val minute = calendar.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                this,
                { _, selectedHour, selectedMinute ->
                    // Formatea la hora seleccionada
                    val formattedTime = String.format("%02d:%02d", selectedHour, selectedMinute)
                    entradaTimeText.setText(formattedTime + ":00")
                },
                hour, minute, true // true para formato de 24 horas
            )
            timePickerDialog.show()
        }

        /*
        *
        * Pickers de salida
        *
        */
        salidaDateText.setOnClickListener {
            val calendar = Calendar.getInstance()
            val year = calendar.get(Calendar.YEAR)
            val month = calendar.get(Calendar.MONTH)
            val day = calendar.get(Calendar.DAY_OF_MONTH)

            val datePickerDialog = DatePickerDialog(
                this,
                { _, selectedYear, selectedMonth, selectedDay ->
                    // Formatea la fecha seleccionada
                    val formattedDate = "$selectedYear-${selectedMonth + 1}-$selectedDay"
                    salidaDateText.setText(formattedDate)
                },
                year, month, day
            )
            datePickerDialog.show()
        }

        salidaTimeText.setOnClickListener {
            val calendar = Calendar.getInstance()
            val hour = calendar.get(Calendar.HOUR_OF_DAY)
            val minute = calendar.get(Calendar.MINUTE)

            val timePickerDialog = TimePickerDialog(
                this,
                { _, selectedHour, selectedMinute ->
                    // Formatea la hora seleccionada
                    val formattedTime = String.format("%02d:%02d", selectedHour, selectedMinute)
                    salidaTimeText.setText(formattedTime + ":00")
                },
                hour, minute, true // true para formato de 24 horas
            )
            timePickerDialog.show()
        }

    }

    private fun registrarEntrada() {
        val call = RetrofitClient.instance.registroEntrada(RegistroEntradaData(
            null,
            RegistroGeneral.entrada,
            RegistroGeneral.vehiculo_id,
            RegistroGeneral.cliente_id
            ))

        call.enqueue(object : Callback<RegistroResponse> {
            override fun onResponse(call: Call<RegistroResponse>, response: Response<RegistroResponse>) {
                if (response.isSuccessful) {
                    val registroResponse = response.body()
                    if (registroResponse != null && registroResponse.status) {
                        Toast.makeText(this@DetalleActivity, "Entrada registrada correctamente", Toast.LENGTH_LONG).show()
                        val intent = Intent(this@DetalleActivity, Registro::class.java)
                        startActivity(intent)
                    } else {
                        Toast.makeText(this@DetalleActivity, registroResponse?.message ?: "Error desconocido", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@DetalleActivity, "No se pudo registrar la entrada", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<RegistroResponse>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@DetalleActivity, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun registrarSalida() {
        // Calcular total
        this.calcularTotal()

        val call = RetrofitClient.instance.registroSalida(
            RegistroSalidaData(
            null,
            RegistroGeneral.salida!!,
            RegistroGeneral.total!!
            ),
            RegistroGeneral.id
        )
// TODO: VACIAR
        call.enqueue(object : Callback<RegistroResponse> {
            override fun onResponse(call: Call<RegistroResponse>, response: Response<RegistroResponse>) {
                if (response.isSuccessful) {
//                    Toast.makeText(this@DetalleActivity, response.body()?.message, Toast.LENGTH_LONG).show()
                    val registroResponse = response.body()
                    if (registroResponse != null && registroResponse.status) {
                        Toast.makeText(this@DetalleActivity, "Salida registrada correctamente" + registroResponse.message, Toast.LENGTH_LONG).show()
                        val intent = Intent(this@DetalleActivity, Registro::class.java)

                        /*
                        *
                        * Dialog
                        *
                        */
                        // Crea el diálogo
                        val builder = AlertDialog.Builder(this@DetalleActivity)
                        builder.setTitle("Total a cancelar")
                        builder.setMessage("El total a cancelar es de ${RegistroGeneral.total} dólares")

                        // Botón de confirmación OK
                        builder.setPositiveButton("OK") { dialog, which ->
                            // Acción a realizar cuando el usuario presiona OK
                            startActivity(intent)
                        }
                        // Mostrar el diálogo
                        builder.show()

                    } else {
                        Toast.makeText(this@DetalleActivity, registroResponse?.message ?: "Error desconocido", Toast.LENGTH_LONG).show()
                    }
                } else {
                    Toast.makeText(this@DetalleActivity, "No se pudo registrar la entrada", Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<RegistroResponse>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@DetalleActivity, errorMessage, Toast.LENGTH_LONG).show()
            }
        })
    }

    private fun calcularTotal() {
        val HoraSalida = RegistroGeneral.salida?.split(" ")?.get(1)?.split(":")?.get(0)?.toInt() ?: 0
        val HoraEntrada = RegistroGeneral.entrada.split(" ")[1].split(":")[0].toInt()

        RegistroGeneral.total = (HoraSalida - HoraEntrada) * 1.0
    }
}