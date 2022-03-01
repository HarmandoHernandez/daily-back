// @ts-check

// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')
const STATUS_CODES = require('../shared/enums/status-codes.enums')

const STATUS = require('../shared/enums/status.enum')
const getStatusCode = require('../shared/helpers/status-code.helper')
const AuthService = require('./auth.service')

const authService = new AuthService()

// TODO: Evaluar los tipos de errores para responder codigo de error adecuado
class AuthController {
  /**
   * Managment API request about Sing Up
   */
  async singup (req = request, res = response) {
    const { email, name, password } = req.body
    const response = await authService.singup(email, name, password)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }

  /**
   * Managment API request about Sing In
   */
  async signin (req = request, res = response) {
    const { email, password } = req.body
    const response = await authService.signin(email, password)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }

  /**
   * Managment API request about Generate new Token
   */
  async refreshToken (req = request, res = response) {
    // @ts-ignore
    const { uid, name } = req
    const response = await authService.getNewToken(uid, name)

    if (response.status === STATUS.SUCCESS) {
      return res.status(STATUS_CODES.OK).json(response)
    }
    // STATUS: ERROR
    const status = getStatusCode(response.message[0].error)
    return res.status(status).json(response)
  }
}

module.exports = AuthController
