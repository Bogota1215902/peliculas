import Pelicula from '../models/pelicula.js';

const helpersPelicula ={
    Reparto:async (reparto, req) => {
        if (reparto) {   
            for (let i = 0; i < reparto.length; i++) {
                const element = reparto[i].idusuario;
                var isValid =  mongoose.Types.ObjectId.isValid(element);                
                if (!isValid)throw new Error(`Id invalido!!! `)   
            }            
        }
    },
}

export {helpersPelicula};