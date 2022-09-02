import Comentario from "../models/comentario.js";

const comentarioGet = async (req, res) => {
  const comentario = await Comentario.find()
    .populate("idPelicula", ["titulo", "genero", "idioma", "director"])
    .populate("idUsuario", ["nombre", "apellido", "email", "password"])
    .populate("comentario");

  res.json({
    comentario,
  });
};

const comentariosUsuarioGet = async (req, res)=>{
  const {id} = req.params;    
  const coment= await Comentario.find({idUsuario:id})
  .populate("idPelicula", ["titulo", "genero", "idioma", "director"])
    .populate("idUsuario", ["nombre", "apellido", "email", "password"])

  res.json({
      coment,
  })
};

const comentarioIdGet = async (req, res)=>{
  const {id} = req.params;    
  const coment= await Comentario.findById(id)
  res.json({
      coment,
  })
};

const comentarioComentGet = async (req, res)=>{
  const {comentario} = req.params;    
  const coment= await Comentario.find({$or:[
    {comentario:new RegExp(comentario)},
]}) 
  res.json({
      coment,
  })
};

const comentarioPost = async (req, res) => {
  const { idPelicula, idUsuario, comentario } = req.body;
  const comentarios = new Comentario({ idPelicula, idUsuario, comentario });
  comentarios.save(); //esto me permite guardar la informacion en la base de datos
  res.json({ comentarios });
};

const comentarioDelete = async (req, res)=>{
  const {id}= req.params;
 const coment= await Comentario.findByIdAndDelete(id);
 res.json({
     coment
 })
}

export { comentarioGet, comentarioPost, comentariosUsuarioGet, comentarioIdGet, comentarioComentGet,comentarioDelete };
