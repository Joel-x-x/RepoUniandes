import mongoose from "mongoose";

export const PeliculasSchema = new mongoose.Schema(
  { 
    titulo: {type: String, required: true},
    director: {type: mongoose.Schema.Types.ObjectId, ref: 'directores'},
    actores: [{type: mongoose.Schema.Types.ObjectId, ref: 'actores'}],
  },
  {
    timestamps: true,
  }
)