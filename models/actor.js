import mongoose from 'mongoose'

const ActorSchema = new mongoose.Schema({
    nombre:{type: String,maxLength:50,required:true},
    alias:{type: String,maxLength:25},
    foto:{type: String,required:true, unique:true},
    biografia:{type: String,required:true},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Actor',ActorSchema)