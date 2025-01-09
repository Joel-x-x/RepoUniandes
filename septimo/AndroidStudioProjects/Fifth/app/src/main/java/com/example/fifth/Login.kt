package com.example.fifth

import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.android.volley.Request
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import org.json.JSONException
import org.json.JSONObject

class Login : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_login)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        var usuarioText = findViewById<TextView>(R.id.usuarioText)
        var passwordText = findViewById<TextView>(R.id.passwordText)
        var ingresarButton = findViewById<Button>(R.id.ingresarButton)

        ingresarButton.setOnClickListener {
            var url = "http://10.0.2.2/URLPHP"

            val datos = JSONObject()
            datos.put("accion","loggin")
            datos.put("usuario", usuarioText)
            datos.put("password", passwordText)

            var rq = Volley.newRequestQueue(this)
            var jsor = JsonObjectRequest(Request.Method.POST, url, datos, {
                s ->
                 try {
                    val obj = (s)
                     if(obj.getBoolean("estado")) {
                         val dato = obj.getJSONObject("persona")
                         val codigo = dato.getString("codigo")
                     } else {
                         Toast.makeText(applicationContext, obj.getString("mensaje").toString(), Toast.LENGTH_SHORT).show()
                     }
                 } catch (e: JSONException) {
                     Toast.makeText(applicationContext, e.toString(), Toast.LENGTH_SHORT).show()
                 }
            }, {volleyError -> Toast.makeText(applicationContext, volleyError.message, Toast.LENGTH_SHORT).show()}
            )
        }
    }
}