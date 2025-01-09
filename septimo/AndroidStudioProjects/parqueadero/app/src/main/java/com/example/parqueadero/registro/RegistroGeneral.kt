package com.example.parqueadero.registro

class RegistroGeneral {
    companion object {
        // Método para limpiar todos los datos
        fun limpiarDatos() {
            id = 0
            entrada = ""
            salida = null
            total = null
            vehiculo_id = 0
            cliente_id = 0
            placa = ""
            marca = ""
            modelo = ""
            color = ""
            nombre_completo = ""
            identificacion = ""
            telefono = ""
        }

        var id: Int = 0
        var entrada: String = ""
        var salida: String? = null
        var total: Double? = null
        var vehiculo_id: Int = 0
        var cliente_id: Int = 0
        var placa: String = ""
        var marca: String = ""
        var modelo: String = ""
        var color: String = ""
        var nombre_completo: String = ""
        var identificacion: String = ""
        var telefono: String = ""
    }

}