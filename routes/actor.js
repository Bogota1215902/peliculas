import {Router} from "express"
import {actorGet, actorPost, actorGetId,actorGetNombre, actorPut,actorDelete} from "../controllers/actor.js"
import {check} from "express-validator"
import { validarCampos } from "../middleware/validar_campos.js"
import { cargarArchivo } from "../controllers/actor.js"
import subirArchivo from "../helpers/subir-archivo.js"
import validarExistaArchivo from "../middleware/validar-existe-archivo.js"
const router = new Router()


router.get('/',actorGet)
router.get('/id/:id',actorGetId)
router.get('/nombre',actorGetNombre)
router.post('/',[
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('foto', 'La foto es obligatorio').not().isEmpty(),
    check('biografia', 'La biografia es obligatorio').not().isEmpty(),
    validarCampos       
],actorPost)
router.put('/:id',actorPut)
router.post('/upload/:id',[
  
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom(), 
    validarExistaArchivo,
    validarCampos
],cargarArchivo)
router.post('/subir')
check('id').isMongoId(),
subirArchivo,
router.delete('/:id',actorDelete)


export default router