package com.example.parqueadero.retrofit

import com.example.parqueadero.login.ApiService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

// Libreria para trabajar con API REST
object RetrofitClient {
    private const val BASE_URL = "http://10.0.2.2/RepoUniandes/septimo/parqueadero/controllers/"

    val instance: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}