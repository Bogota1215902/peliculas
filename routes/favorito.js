import {Router} from "express"
import {favoritoGet, favoritoPost,favoritoIdGet,favoritoTituloGet,favoritoDelete} from "../controllers/favorito.js"
import {check} from "express-validator"
import { validarCampos } from "../middleware/validar_campos.js"
const router = new Router()

router.get('/',favoritoGet)
router.get('/:id',[
    check('id').isMongoId(),
    validarCampos
],favoritoIdGet)
router.get('/titulo/:titulo',favoritoTituloGet)
router.post('/',favoritoPost)
router.delete('/:id',[
    check('id').isMongoId(),
    validarCampos
],favoritoDelete)


export default router