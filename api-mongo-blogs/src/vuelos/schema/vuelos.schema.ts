import mongoose from 'mongoose';
export const VuelosSchema = new mongoose.Schema(
  {
    piloto: { type: String, required: true },
    avion: { type: String, required: true },
    fecha: { type: Date, required: true },
    destino: { type: String, required: true },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passengers' }],
  },
  {
    timestamps: true,
  },
);
