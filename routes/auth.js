const { Router } = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router()

// Crear un nuevo usuario
router.post('/register', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'La contraseña debe contener un mininimo de 8 campos').isLength({ min: 8 }),
  validarCampos
], crearUsuario)

// Login de usuario
router.post('/', [
  check('email', 'El email es incorrecto').isEmail(),
  check('password', 'La contraseña es incorrecta').isLength({ min: 8 }),
  validarCampos
], loginUsuario)

// Validar y revalidar token
router.get('/renew', validarJWT, revalidarToken)

module.exports = router
