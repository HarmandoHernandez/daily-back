// @ts-check

const { Router } = require('express')
const { check } = require('express-validator')
const AuthController = require('./auth.controller')

const {
  validParams,
  validJWT,
  logger
} = require('./../shared/middlewares')

const USER_PARAMS = require('./../user/user.enum')
const VALIDATORS = require('../shared/enums/validators.enum')
const router = Router()
const authController = new AuthController()

// Crear un nuevo usuario
router.post('/register', [
  logger,
  check(USER_PARAMS.NAME, VALIDATORS.REQUIRED).not().isEmpty(),
  check(USER_PARAMS.EMAIL, VALIDATORS.INVALID).isEmail(),
  check(USER_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validParams
], authController.singup)

// Login de usuario
router.post('/', [
  logger,
  check(USER_PARAMS.EMAIL, VALIDATORS.CORRUPT).isEmail(),
  check(USER_PARAMS.PASSWORD, VALIDATORS.LENGTH + '=8-50').isLength({ min: 8, max: 50 }),
  validParams
], authController.signin)

// Validar y revalidar token
// TODO: validar que no esten vacios los campos
router.get('/renew',
  logger,
  validJWT, authController.refreshToken)

module.exports = router
