import mongoose from 'mongoose';

const FavoritoSchema = new mongoose.Schema({
    idPelicula:{
        type: mongoose.Schema.ObjectId,
        ref:"Pelicula",
        required: true
    },
    idUsuario:{
        type: mongoose.Schema.ObjectId,
        ref:"Persona",
        required: true
    },
    createAt:{type:Date,default:Date.new}
})

export default mongoose.model('Favorito',FavoritoSchema)