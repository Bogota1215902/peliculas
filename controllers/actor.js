
import Actor from '../models/actor.js'
import {v2 as cloudinary} from 'cloudinary'


const actorGet= async (req, res)=>{
 const actores = await Actor.find()
  res.json({
        actores
    })
}

const actorGetId= async (req, res)=>{
    const {idActor}=req.params
    const actor = await Actor.findById(idActor) 

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

const cargarArchivoCloud = async (req, res) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true
    });

    const { id } = req.params;
    try {
        //subir archivo

        const { tempFilePath } = req.files.archivo
        cloudinary.uploader.upload(tempFilePath,
            async function (error, result) {
                if (result) {
                    let usuario = await Actor.findById(id);
                    if (usuario.foto) {
                        const nombreTemp = usuario.foto.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    usuario = await Actor.findByIdAndUpdate(id, { foto: result.url })
                    //responder
                    res.json({ url: result.url });
                } else {
                    res.json(error)
                }
            })
    } catch (error) {
        res.status(400).json({ error, 'general': 'Controlador' })
    }
}
 const actorDelete = async (req, res)=>{
     const {id}= req.params;
    const actor= await Actor.findByIdAndDelete(id);
    res.json({
        actor
    })
 }
export {actorGet, actorPost,actorGetId,actorGetNombre,actorPut,cargarArchivoCloud,actorDelete}


