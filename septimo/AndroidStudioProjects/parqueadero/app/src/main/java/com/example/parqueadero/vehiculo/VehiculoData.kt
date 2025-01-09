package com.example.parqueadero.vehiculo

import java.io.Serializable

data class VehiculoData(
    val id: Int?,
    val marca: String,
    val modelo: String,
    val placa: String,
    val color: String,
) : Serializable
