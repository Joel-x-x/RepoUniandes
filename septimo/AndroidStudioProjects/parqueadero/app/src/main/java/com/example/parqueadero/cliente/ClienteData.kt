package com.example.parqueadero.cliente

import java.io.Serializable

data class ClienteData(
    val id: Int?,
    val nombre_completo: String,
    val identificacion: String,
    val telefono: String
) : Serializable
