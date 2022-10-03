import Favorito from '../models/favorito.js';

const favoritoGet = async (req, res) => {
  const favorito = 
  await Favorito
   .find()
   .populate("idPelicula",["titulo", "genero", "idioma", "director"])
   .populate("idUsuario", ["nombre", "apellido", "email", "password"])

 
 res.json({
   favorito
 })
};
const favoritoIdGet = async (req, res)=>{
  const {id} = req.params;    
  const favorite= await Favorito.findById(id)
  res.json({
      favorite,
  })
};

const favoritoTituloGet = async (req, res)=>{
  const {ciudad} = req.params;    
  const ciudades= await ciudad.find({idciudad:ciudad})
  .populate("idPelicula", ["titulo", "genero", "idioma", "director"])
  res.json({
      favorite,
  })
};

const favoritoPost = async (req, res)=>{
  const {idPelicula,poster,titulo,genero} = req.body
  const favoritos = new Favorito({idPelicula,poster,titulo,genero})
  favoritos.save() //esto me permite guardar la informacion en la base de datos
  res.json({favoritos})
};

const favoritoDelete = async (req, res)=>{
  const {id}= req.params;
 const favorite= await Favorito.findByIdAndDelete(id);
 res.json({
     favorite
 })
}





export {favoritoGet, favoritoPost,favoritoIdGet, favoritoTituloGet,favoritoDelete}