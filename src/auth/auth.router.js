const { Router } = require('express')
const { check } = require('express-validator')

const {
  validParams,
  validJWT,
  logger
} = require('./../shared/middlewares')

const {
  VALIDATORS,
  AUTH_PARAMS
} = require('./../shared/enums')

const {
  createUser,
  loginUser,
  validToken
} = require('./auth.controller')

const router = Router()

// Crear un nuevo usuario
router.post('/register', [
  logger,
  check(AUTH_PARAMS.NAME, VALIDATORS.REQUIRED).not().isEmpty(),
  check(AUTH_PARAMS.EMAIL, VALIDATORS.INVALID).isEmail(),
  check(AUTH_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validParams
], createUser)

// Login de usuario
router.post('/', [
  logger,
  check(AUTH_PARAMS.EMAIL, VALIDATORS.CORRUPT).isEmail(),
  check(AUTH_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validParams
], loginUser)

// Validar y revalidar token
router.get('/renew',
  logger,
  validJWT, validToken)

module.exports = router
