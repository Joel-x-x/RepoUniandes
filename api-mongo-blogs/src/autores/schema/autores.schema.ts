import mongoose from 'mongoose';

export const AutoresSchema = new mongoose.Schema({
  name: { type: String, required: true },
  apellido: { type: String, required: true },
  nacionalidad: { type: String, required: true },
  nacimiento: { type: Date, required: true },
  genero: { type: Boolean, required: true },
},
{
  timestamps: true,
});
