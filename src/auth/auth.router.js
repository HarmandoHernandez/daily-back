const { Router } = require('express')
const { check } = require('express-validator')
const AuthController = require('./auth.controller')

const {
  validParams,
  validJWT,
  logger
} = require('./../shared/middlewares')

const {
  VALIDATORS,
  AUTH_PARAMS
} = require('./../shared/enums')

const router = Router()
const authController = new AuthController()

// Crear un nuevo usuario
router.post('/register', [
  logger,
  check(AUTH_PARAMS.NAME, VALIDATORS.REQUIRED).not().isEmpty(),
  check(AUTH_PARAMS.EMAIL, VALIDATORS.INVALID).isEmail(),
  check(AUTH_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validParams
], authController.createUser)

// Login de usuario
router.post('/', [
  logger,
  check(AUTH_PARAMS.EMAIL, VALIDATORS.CORRUPT).isEmail(),
  check(AUTH_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validParams
], authController.loginUser)

// Validar y revalidar token
// TODO: validar que no esten vacios los campos
router.get('/renew',
  logger,
  validJWT, authController.refreshToken)

module.exports = router
