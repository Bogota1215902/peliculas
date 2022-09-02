import mongoose from "mongoose";

const PeliculaSchema = new mongoose.Schema({
  titulo: { type: String, maxLength: 25, required: true },
  duracion:{type:String, required: true},
  poster:{type: String, default:""},
  genero: { type: String, maxLength: 25, required: true },
  sinopsis: { type: String,required: true},
  estado:{ type: String, maxLength: 25, required:0},
  idioma: { type: String, required: 0, default: 0 },
  director: { type: String, required: 0 },
  reparto: [
    {
      idActor: {
        type: mongoose.Schema.ObjectId,
        ref: "Actor",
        required: true,
      },
      personaje: { type: String },
      rol: { type: String },
    },
  ],
  createAt: { type: Date, default: Date.new },
});

export default mongoose.model("Pelicula", PeliculaSchema);