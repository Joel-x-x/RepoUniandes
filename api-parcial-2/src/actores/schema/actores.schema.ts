import mongoose from "mongoose";

export const ActoresSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
  }
)