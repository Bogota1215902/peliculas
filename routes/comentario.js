import {Router} from "express"
import { check } from "express-validator"
import {comentarioGet, comentarioPost, comentariosUsuarioGet, comentarioIdGet, comentarioComentGet,comentarioDelete} from "../controllers/comentario.js"
import { validarCampos } from "../middleware/validar_campos.js"
const router = new Router()


router.get('/',comentarioGet)
router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],comentariosUsuarioGet)
router.get('/id/:id',[
    check('id').isMongoId(),
    validarCampos
],comentarioIdGet)
router.get('/coment/:comentario',comentarioComentGet)
router.post('/',[
    check('idPelicula', 'El id de pelicula es obligatorio!').not().isEmpty(),
    check('idUsuario', 'El id de usuario es obligatorio').not().isEmpty(),
    check('comentario', 'Debes ingresar un comentario').not().isEmpty(),
   
    validarCampos       
],comentarioPost)
router.delete('/:id',[
    check('id').isMongoId(),
    validarCampos
],comentarioDelete)




export default router