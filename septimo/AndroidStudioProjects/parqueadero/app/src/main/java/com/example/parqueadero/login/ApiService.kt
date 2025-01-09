package com.example.parqueadero.login

import com.example.parqueadero.cliente.ClienteData
import com.example.parqueadero.cliente.ClienteResponse
import com.example.parqueadero.registro.RegistroData
import com.example.parqueadero.registro.RegistroEntradaData
import com.example.parqueadero.registro.RegistroResponse
import com.example.parqueadero.registro.RegistroSalidaData
import com.example.parqueadero.vehiculo.VehiculoData
import com.example.parqueadero.vehiculo.VehiculoResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Query

interface ApiService {
    @POST("UsuarioController.php")
    fun login(@Body request: LoginRequest): Call<LoginResponse>

    @GET("RegistroController.php")
    fun listarRegistros(): Call<List<RegistroData>>

    @GET("ClienteController.php")
    fun listarClientes(): Call<List<ClienteData>>

    @POST("ClienteController.php")
    fun crearCliente(@Body request: ClienteData): Call<ClienteResponse>

    @POST("VehiculoController.php")
    fun crearVehiculo(@Body request: VehiculoData): Call<VehiculoResponse>

    @GET("VehiculoController.php")
    fun listarVehiculos(): Call<List<VehiculoData>>

    @POST("RegistroController.php")
    fun registroEntrada(@Body request: RegistroEntradaData): Call<RegistroResponse>

    @PUT("RegistroController.php")
    fun registroSalida(@Body request: RegistroSalidaData, @Query("id") id: Int): Call<RegistroResponse>
}