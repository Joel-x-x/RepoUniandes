import mongoose from "mongoose";

export const DirectoresSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
  }
)