package com.example.fifth

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONException
import org.json.JSONObject

class MainActivity : AppCompatActivity() {
    lateinit var cedulaText: EditText
    lateinit var nombreText: EditText
    lateinit var apellidoText: EditText
    lateinit var claveText: EditText
    lateinit var emailText: EditText
    lateinit var lista: ListView
    lateinit var guardarButton: Button
    lateinit var actualizarButton: Button
    lateinit var consultarButton: Button
    lateinit var eliminarButton: Button
    lateinit var cancelarButton: Button
    lateinit var nuevoButton: Button
    lateinit var arrayCodes: ArrayList<String>
    lateinit var codigoActual: String
    lateinit var contactoButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        mapeo()
        lcajas()
        bcajas()
        bbotones()
        consultar()
        dato()

        nuevoButton.setOnClickListener {
            bbotones()
            guardarButton.isEnabled = true
            cancelarButton.isEnabled = true
            acajas()
        }

        guardarButton.setOnClickListener {
            if(cedulaText.text.toString().equals("") || nombreText.text.toString().equals("") || apellidoText.text.toString().equals("") || emailText.text.toString().equals("") || claveText.text.toString().equals("")) {
                Toast.makeText(applicationContext, "Faltan datos", Toast.LENGTH_SHORT).show()
            } else {
                guardar()
                Toast.makeText(applicationContext, "Datos guardados correctamente", Toast.LENGTH_SHORT).show()
                lcajas()
                bcajas()
                bbotones()
                consultar()
                nuevoButton.isEnabled = true
            }
        }

        cancelarButton.setOnClickListener{
            lcajas()
            bcajas()
            bbotones()
            nuevoButton.isEnabled = true
        }

        actualizarButton.setOnClickListener {
            actualizar()
        }

        eliminarButton.setOnClickListener {
            pregunta()
        }

        contactoButton.setOnClickListener {
            val intent = Intent(this,Contacto::class.java)
            intent.putExtra("codigoPersona", codigoActual)
            startActivity(intent)
        }
    }

    fun bbotones() {
        guardarButton.isEnabled = false
        actualizarButton.isEnabled = false
        consultarButton.isEnabled = false
        eliminarButton.isEnabled = false
        cancelarButton.isEnabled = false
        contactoButton.isEnabled = false
    }

    fun acajas() {
        cedulaText.isEnabled = true
        nombreText.isEnabled = true
        apellidoText.isEnabled = true
        emailText.isEnabled = true
        claveText.isEnabled = true
    }

    fun bcajas() {
        cedulaText.isEnabled = false
        nombreText.isEnabled = false
        apellidoText.isEnabled = false
        emailText.isEnabled = false
        claveText.isEnabled = false
    }

    // Consultar
    private fun consultar() {
        arrayCodes.clear()
        val al = ArrayList<String>()
        var url = "http://10.0.2.2/septimo/agenda/persona.php"
        val campos = JSONObject()
        campos.put("accion", "consultar")
        val rq = Volley.newRequestQueue(this)
        val jsor = JsonObjectRequest(Request.Method.POST, url, campos,
            { s->
                 try {
                     val obj = (s)
                     if(obj.getBoolean("estado")) {
                         val array = obj.getJSONArray("personas")
                         for(i in 0..array.length() - 1) {
                             val fila = array.getJSONObject(i)
                             this.arrayCodes.add(fila.getString("codigo"))
                             al.add(fila.getString("cedula") + " " + fila.getString("nombre") + " " + fila.getString("apellido"))
                         }
                         val ad = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, al)
                         lista.adapter = ad
                         ad.notifyDataSetChanged()
                     } else {
                         Toast.makeText(applicationContext, obj.getBoolean("mensaje").toString(), Toast.LENGTH_SHORT).show()
                     }
                 } catch (e: JSONException) {
                     Toast.makeText(applicationContext, e.toString(), Toast.LENGTH_LONG).show()
                 }
             },
            { volleyError -> Toast.makeText(applicationContext, volleyError.message,  Toast.LENGTH_SHORT).show()})
        rq.add(jsor)
    }

    private fun guardar(){
        var url = "http://10.0.2.2/septimo/agenda/persona.php"
        val campos = JSONObject()
        campos.put("accion","guardar")
        campos.put("cedula",cedulaText.text.toString())
        campos.put("nombre",nombreText.text.toString())
        campos.put("apellido",apellidoText.text.toString())
        campos.put("clave",claveText.text.toString())
        campos.put("email",emailText.text.toString())
        val rq = Volley.newRequestQueue(this)
        val json = JsonObjectRequest(
            Request.Method.POST, url,campos,
            { s->
                try{
                    val obj = (s)
                    if (obj.getBoolean("estado")){
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }
                }catch (e: JSONException){
                    Toast.makeText(applicationContext, e.toString(),
                        Toast.LENGTH_SHORT).show()
                }

            },
            { volleyError-> Toast.makeText(applicationContext,volleyError.message,Toast.LENGTH_SHORT).show()})
        rq.add(json)
    }

    private fun actualizar(){
        var url = "http://10.0.2.2/septimo/agenda/persona.php"
        val campos = JSONObject()
        campos.put("accion","actualizar")
        campos.put("cedula",cedulaText.text.toString())
        campos.put("nombre",nombreText.text.toString())
        campos.put("apellido",apellidoText.text.toString())
        campos.put("clave",claveText.text.toString())
        campos.put("email",emailText.text.toString())
        campos.put("codigo",codigoActual)
        val rq = Volley.newRequestQueue(this)
        val json = JsonObjectRequest(
            Request.Method.POST, url,campos,
            { s->
                try{
                    val obj = (s)
                    if (obj.getBoolean("estado")){
                        consultar()
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }
                }catch (e: JSONException){
                    Toast.makeText(applicationContext, e.toString(),
                        Toast.LENGTH_SHORT).show()
                }

            },
            { volleyError-> Toast.makeText(applicationContext,volleyError.message,Toast.LENGTH_SHORT).show()})
        rq.add(json)
    }
    private fun eliminar(){
        var url = "http://10.0.2.2/septimo/agenda/persona.php"
        val campos = JSONObject()
        campos.put("accion","eliminar")
        campos.put("codigo", codigoActual)
        val rq = Volley.newRequestQueue(this)
        val json = JsonObjectRequest(
            Request.Method.POST, url,campos,
            { s->
                try{
                    val obj = (s)
                    if (obj.getBoolean("estado")){
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                        consultar()
                    }else{
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }
                }catch (e: JSONException){
                    Toast.makeText(applicationContext, e.toString(),
                        Toast.LENGTH_SHORT).show()
                }

            },
            { volleyError-> Toast.makeText(applicationContext,volleyError.message,Toast.LENGTH_SHORT).show()})
        rq.add(json)
    }

    fun pregunta(){
        // Crear un diálogo de confirmación
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Confirmación")
        builder.setMessage("¿Estás seguro de que deseas eliminar?")

        // Configurar el botón "Sí"
        builder.setPositiveButton("Sí") { dialog, _ ->
            eliminar() // Llamar a la función eliminar
            dialog.dismiss() // Cerrar el diálogo
        }

        // Configurar el botón "No"
        builder.setNegativeButton("No") { dialog, _ ->
            dialog.dismiss() // Solo cerrar el diálogo
        }

        // Mostrar el diálogo
        val dialog = builder.create()
        dialog.show()
    }

    private fun vcedula(cedula:String){
        var url = "http://10.0.2.2/septimo/agenda/persona.php"
        val campos = JSONObject()
        campos.put("accion","vcedula")
        campos.put("cedula",cedulaText.text.toString())
        val rq = Volley.newRequestQueue(this)
        val json = JsonObjectRequest(
            Request.Method.POST, url,campos,
            { s->
                try{
                    val obj = (s)
                    if (obj.getBoolean("estado")){
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }else{
                        Toast.makeText(applicationContext, obj.getString("mensaje").toString(),
                            Toast.LENGTH_SHORT).show()
                    }
                }catch (e: JSONException){
                    Toast.makeText(applicationContext, e.toString(),
                        Toast.LENGTH_SHORT).show()
                }

            },
            { volleyError-> Toast.makeText(applicationContext,volleyError.message,Toast.LENGTH_SHORT).show()})
        rq.add(json)

    }

    private fun lcajas() {
        cedulaText.setText("")
        nombreText.setText("")
        apellidoText.setText("")
        emailText.setText("")
        claveText.setText("")
    }

    private fun mapeo() {
        cedulaText = findViewById(R.id.cedulaText)
        nombreText = findViewById(R.id.nombreText)
        apellidoText = findViewById(R.id.apellidoText)
        claveText = findViewById(R.id.claveText)
        emailText = findViewById(R.id.emailText)
        lista = findViewById<ListView>(R.id.lista)
        guardarButton = findViewById<Button>(R.id.guardarButton)
        actualizarButton = findViewById<Button>(R.id.actualizarButton)
        consultarButton = findViewById<Button>(R.id.consultarButton)
        eliminarButton = findViewById<Button>(R.id.eliminarButton)
        cancelarButton = findViewById<Button>(R.id.cancelarButton)
        nuevoButton = findViewById<Button>(R.id.nuevoButton)
        arrayCodes = arrayListOf<String>()
        contactoButton = findViewById<Button>(R.id.contactoButton)
    }

    private fun dato() {
        acajas()
        lista.setOnItemClickListener { parent, view, position, id ->
            try {
                // Obtener el elemento seleccionado (string de la lista)
                val item = parent.getItemAtPosition(position).toString()

                // Dividir los valores obtenidos (asegúrate de usar el mismo formato con el que llenaste la lista)
                val parts = item.split(" ") // Ajusta según el formato: "cedula nombre"

                // Crear el JSONObject con los datos
                val campos = JSONObject()
                campos.put("cedula", parts[0])
                campos.put("nombre", parts[1])
                campos.put("apellido", parts[2])
                this.codigoActual = arrayCodes[position]
                // Agregar más partes si el string contiene apellido, email, etc.

                // Actualizar los campos del formulario con los valores seleccionados
                cedulaText.setText(parts[0])
                nombreText.setText(parts[1])
                apellidoText.setText(parts[2])
                // Actualiza más campos del formulario si es necesario

                // Habilitar botones necesarios
                actualizarButton.isEnabled = true
                eliminarButton.isEnabled = true
                contactoButton.isEnabled = true

            } catch (e: Exception) {
                Toast.makeText(applicationContext, "Error al procesar la selección", Toast.LENGTH_SHORT).show()
            }
        }
    }


}