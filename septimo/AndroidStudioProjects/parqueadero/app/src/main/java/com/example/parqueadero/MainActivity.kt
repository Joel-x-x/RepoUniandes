package com.example.parqueadero

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.parqueadero.login.LoginRequest
import com.example.parqueadero.login.LoginResponse
import com.example.parqueadero.registro.Registro
import com.example.parqueadero.retrofit.RetrofitClient
import com.example.parqueadero.registro.RegistroData
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    var intentos: Int = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        // Validar intentos
        var intentos: Int = 0

        var emailText = findViewById<EditText>(R.id.emailText);
        var passwordText = findViewById<EditText>(R.id.passwordText);
        var ingresarButton = findViewById<Button>(R.id.ingresarButton);

        ingresarButton.setOnClickListener {
//            Toast.makeText(this, emailText.text.toString() + passwordText.text.toString(), Toast.LENGTH_SHORT).show()
            this.login(emailText.text.toString(), passwordText.text.toString())
        }

    }

    fun incrementar() {
        this.intentos++
    }

    fun validarIntentos() {
        // Validar intentos
        when(this.intentos) {
            1 -> {
                Toast.makeText(this@MainActivity, "Primer intento fallido, al siguiente intento se bloqueara el ingreso.", Toast.LENGTH_SHORT).show()
            }
            2 -> {
                Toast.makeText(this@MainActivity, "Limite de intentos alcanzado.", Toast.LENGTH_SHORT).show()
            }
            3 -> {
                Toast.makeText(this@MainActivity, "Límite de intentos alcanzado, el ingreso se ha bloqueado.", Toast.LENGTH_LONG).show()
                return
            }
        }
    }

    private fun login(email: String, password: String) {
        val request = LoginRequest(email, password)
        val call = RetrofitClient.instance.login(request)

        call.enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.isSuccessful) {
                    val loginResponse = response.body()
                    if (loginResponse != null && loginResponse.status) {
                        // Datos del usuario
//                        val userData = loginResponse.data
                        val intent = Intent(this@MainActivity, Registro::class.java)
                        startActivity(intent)

//                        Toast.makeText(this@MainActivity, loginResponse.message, Toast.LENGTH_LONG).show()
                    } else {
                        incrementar()
                        validarIntentos()
//                        val errorMessage = "Error: ${loginResponse?.message}"
//                        Toast.makeText(this@MainActivity, errorMessage, Toast.LENGTH_LONG).show()
                    }
                } else {
                    val errorMessage = "Error en la respuesta: ${response.errorBody()?.string()}"
                    Toast.makeText(this@MainActivity, errorMessage, Toast.LENGTH_LONG).show()
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                val errorMessage = "Error en la solicitud: ${t.message}"
                Toast.makeText(this@MainActivity, errorMessage, Toast.LENGTH_LONG).show()
            }
        })

    }

}