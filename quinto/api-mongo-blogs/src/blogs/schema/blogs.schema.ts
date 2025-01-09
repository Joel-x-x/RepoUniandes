import mongoose from "mongoose";

export const BlogsSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    tema: {type: String, required: true},
    visitas: {type: Number, required: true},
    autores: [{type: mongoose.Schema.Types.ObjectId, red: 'autores'}],
}, {
    timestamps: true,
})