import Pelicula from '../models/pelicula.js';

const helpersPelicula ={
    Reparto:async (reparto, req) => {
        if (reparto) {   
            for (let i = 0; i < reparto.length; i++) {
                const element = reparto[i].idActor;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },
    existeUsuarioById : async (id) => {
        const existe = await Pelicula.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    },

}

export {helpersPelicula};