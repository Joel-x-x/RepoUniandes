import mongoose from "mongoose";

export const ProyeccionesSchema = new mongoose.Schema(
  {
    fecha: { type: Date, required: true },
    sala: { type: String, required: true },
    pelicula: { type: mongoose.Schema.Types.ObjectId, ref: "peliculas", required: true },
  }
)