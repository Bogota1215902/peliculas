import subirArchivo from '../helpers/subir-archivo.js';
import Actor from '../models/actor.js';
import path from 'path';
import url from 'url'
import * as fs from "fs"

const actorGet= async (req, res)=>{
 const actores = await Actor.find()
  res.json({
        actores
    })
}

const actorGetId= async (req, res)=>{
    const {id}=req.params
    const actor = await Actor.findById(id) 

    res.json({
        actor
    })
}

const actorGetNombre= async (req, res)=>{
    const {nombre}=req.query
    const actor = await Actor.find({nombre}) 

    res.json({
        actor
    })
}

const actorPost = async (req, res)=>{
    const {nombre,alias,foto,biografia}=req.body
    const actores = new Actor({nombre,alias,foto,biografia})
    actores.save() 
    res.json({
        actores
    })
}
const actorPut = async (req, res)=>{
    const {id} = req.params;    
    const {nombre,alias,foto,biografia}=req.body;
    const actor= await Actor.findByIdAndUpdate(id,{nombre,alias,foto,biografia});
    res.json({
        actor
    })
}

const cargarArchivo = async (req, res) => {
    const { id } = req.params;
   // try {
        let nombre
        await subirArchivo(req.files, undefined)
            .then(value => nombre = value)
            .catch((err) => console.log(err));

        //persona a la cual pertenece la foto
        let actor = await Actor.findById(id);
        if (actor.poster) {
            const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
            const pathImage = path.join(__dirname, '../uploads/', actor.foto);
            
            if (fs.existsSync(pathImage)) {
                console.log('Existe archivo');
                fs.unlinkSync(pathImage)
            }
            
        }
       
        await Actor.findByIdAndUpdate(id, { foto: nombre })
        //responder
        res.json({ nombre });
    // } catch (error) {
    //     res.status(400).json({ error, 'general': 'Controlador' })
    // }

}
 const actorDelete = async (req, res)=>{
     const {id}= req.params;
    const actor= await Actor.findByIdAndDelete(id);
    res.json({
        actor
    })
 }
export {actorGet, actorPost,actorGetId,actorGetNombre,actorPut,cargarArchivo,actorDelete}


