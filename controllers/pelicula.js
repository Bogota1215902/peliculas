// import subirArchivo from '../helpers/subir-archivo.js';
import Pelicula from '../models/pelicula.js';
import {v2 as cloudinary} from 'cloudinary';
// import path from 'path'
// import url from 'url'
// import * as fs from "fs"

const peliculaGet= async (req, res)=>{
    const peliculas = await Pelicula.find()
    res.json({
        peliculas
    })
}

const peliculaGetId= async (req, res)=>{
    const {id}=req.params
    const pelicula = await Pelicula.findById(id) 

    res.json({
        pelicula
    })
}

const peliculaGetTitulo= async (req, res)=>{
    const {titulo}=req.query
    const pelicula = await Pelicula.find({$or:[
        {titulo:new RegExp(titulo)},
        
    ]}) 

    res.json({
        pelicula
    })
}

const peliculaGetGenero= async (req, res)=>{
    const {genero} = req.params;
        console.log(genero);
        const pelicula= await Pelicula.find({genero})
        res.json({
            pelicula,
        })
}

const peliculaGetActoresPelicula = async (req, res)=>{
    const {id}= req.params;
    const pelicula = await Pelicula.find().where('reparto.idActor').in(id).exec();
    res.json({
        pelicula
    })
}

const peliculaPost = async (req, res)=>{
    const {titulo,duracion,poster,genero,sinopsis,estado,idioma,director,reparto}=req.body
    const peliculas = new Pelicula({titulo,duracion,poster,genero,sinopsis,estado,idioma,director,reparto})
    peliculas.save() //esto me permite guardar la informacion en la base de datos
    res.json({peliculas})
}

const peliculaPut = async (req, res)=>{
    const {id} = req.params;    
    const {titulo,duracion,poster,genero,sinopsis,estado,idioma,director,reparto}=req.body;
    const pelicula= await Pelicula.findByIdAndUpdate(id,{titulo,duracion,poster,genero,sinopsis,estado,idioma,director,reparto});
    res.json({
        pelicula
    })
}

const cargarImagen = async (req, res) => {
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
                    let pelicula = await Pelicula.findById(id);
                    if (pelicula.poster) {
                        const nombreTemp = pelicula.poster.split('/')
                        const nombreArchivo = nombreTemp[nombreTemp.length - 1] // hgbkoyinhx9ahaqmpcwl jpg
                        const [public_id] = nombreArchivo.split('.')
                        cloudinary.uploader.destroy(public_id)
                    }
                    pelicula = await Pelicula.findByIdAndUpdate(id, { poster: result.url })
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

const mostrarImagenCloud= async (req, res) => {
    const { id } = req.params

    try {
        let pelicula = await Pelicula.findById(id)
        if (pelicula.poster) {
            return res.json({ url: pelicula.poster })
        }
        res.status(400).json({ msg: 'Falta Imagen' })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const peliculaDelete = async (req, res)=>{
    const {id}= req.params;
   const pelicula= await Pelicula.findByIdAndDelete(id);
   res.json({
       pelicula
   })
}


export {peliculaGet, peliculaPost, peliculaGetId,peliculaGetTitulo,peliculaGetGenero,peliculaGetActoresPelicula,mostrarImagenCloud,cargarImagen,peliculaPut,peliculaDelete}