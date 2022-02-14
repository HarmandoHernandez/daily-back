const { Router } = require('express')
const { check } = require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { log } = require('../middlewares/log')

const VALIDATORS = require('../enums/validators')
const AUTH_PARAMS = require('../enums/auth-params')

const router = Router()

// Crear un nuevo usuario
router.post('/register', [
  log,
  check(AUTH_PARAMS.NAME, VALIDATORS.REQUIRED).not().isEmpty(),
  check(AUTH_PARAMS.EMAIL, VALIDATORS.INVALID).isEmail(),
  check(AUTH_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validarCampos
], crearUsuario)

// Login de usuario
router.post('/', [
  log,
  check(AUTH_PARAMS.EMAIL, VALIDATORS.CORRUPT).isEmail(),
  check(AUTH_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validarCampos
], loginUsuario)

// Validar y revalidar token
router.get('/renew',
  log,
  validarJWT, revalidarToken)

module.exports = router
