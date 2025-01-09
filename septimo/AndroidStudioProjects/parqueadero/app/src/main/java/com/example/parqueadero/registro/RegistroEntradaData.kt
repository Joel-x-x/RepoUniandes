package com.example.parqueadero.registro

data class RegistroEntradaData(
    val id: Int?,
    val entrada: String,
    val vehiculo_id: Int,
    val cliente_id: Int
)
