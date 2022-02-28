// @ts-check

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
