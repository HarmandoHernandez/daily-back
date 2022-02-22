const { response } = require('express')
const { responseError, responseSuccess } = require('../shared/helpers/responses.helper')

const STATUS = require('../shared/enums/status.enum')
const AuthService = require('./auth.service')

const authService = new AuthService()

class AuthController {
  async createUser (req, res = response) {
    const { email, name, password } = req.body
    const response = await authService.singup(email, name, password)
    // TODO: Evaluar los tipos de errores para responder codigo de error
    if (response.status === STATUS.SUCCESS) {
      return res.status(200).json(response)
    }
    return res.status(400).json(response)
    /* try {
      const usuario = await Usuario.findOne({ email })
      if (usuario) {
        return responseError(res, 400, VALIDATORS.INVALID, AUTH_PARAMS.EMAIL)
      }
      // Crear usuario con el modelo
      const dbUser = new Usuario(req.body)
      // Hashear la contraseña
      const salt = bcrypt.genSaltSync()
      dbUser.password = bcrypt.hashSync(password, salt)
      // Generar el JWT
      const token = await generateJWT(dbUser.id, name)
      // Guardar usuario en DB
      await dbUser.save()
      // Generar respuesta exitosa
      responseSuccess(res, 201, dbUser.id, name, token)
    } catch (error) {
      console.error(error)
      return responseError(res)
    } */
  }

  async loginUser (req, res = response) {
    const { email, password } = req.body
    const response = await authService.signin(email, password)
    // TODO: Evaluar los tipos de errores para responder codigo de error
    if (response.status === STATUS.SUCCESS) {
      return res.status(200).json(response)
    }
    return res.status(400).json(response)
  }

  async refreshToken (req, res = response) {
    const { uid, name } = req // Params validates
    const newToken = await authService.getNewToken(uid, name)
    if (newToken.length > 0) {
      return responseSuccess(res, 201, uid, name, newToken)
    }
    return responseError(res)
  }
}

module.exports = AuthController
