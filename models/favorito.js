import mongoose from 'mongoose';

const FavoritoSchema = new mongoose.Schema({
    idPelicula:{
        type: mongoose.Schema.ObjectId,
        ref:"Pelicula",
        required: true
    },
    titulo:{
        type: String

    },
    poster:{
        type: String

    },
    genero:{
        type: String

    },
   
    createAt:{type:Date,default:Date.new}
})

export default mongoose.model('Favorito',FavoritoSchema)