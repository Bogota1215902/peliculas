import mongoose from 'mongoose'

const ComentarioSchema = new mongoose.Schema({
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
    
    comentario:{type: String,required:true},
    
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Comentario',ComentarioSchema)