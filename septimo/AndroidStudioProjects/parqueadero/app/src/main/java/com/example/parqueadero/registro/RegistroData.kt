package com.example.parqueadero.registro

data class RegistroData (
    val id: Int?,
    val entrada: String,
    val salida: String?,
    val total: Double?,
    val vehiculo_id: Int,
    val marca: String,
    val modelo: String,
    val placa: String,
    val color: String,
    val cliente_id: Int,
    val nombre_completo: String,
    val identificacion: String,
    val telefono: String
)
