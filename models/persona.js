import mongoose from 'mongoose'

const PersonaSchema = new mongoose.Schema({

    poster:{type: String, default:"" },
    nombre:{type: String,maxLength:25,required:true},
    apellido:{type: String,maxLength:25,required:true},
    email:{type: String,unique:true,required:true},
    estado:{type: String,default:1},
    password:{type: String,required:true,minLength:6},
    createAt:{type:Date,default:Date.new}
})






export default mongoose.model('Persona',PersonaSchema)