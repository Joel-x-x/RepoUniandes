package com.example.parqueadero.login

data class LoginResponse(
    val status: Boolean,
    val message: String,
    val data: UserData?)

