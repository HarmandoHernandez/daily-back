// @ts-check

// eslint-disable-next-line no-unused-vars
const { response, request } = require('express')

const STATUS = require('../shared/enums/status.enum')
const AuthService = require('./auth.service')

const authService = new AuthService()

// TODO: Evaluar los tipos de errores para responder codigo de error adecuado
class AuthController {
  /**
   * Managment API request about Sing Up
   */
  async singup (req = request, res = response) {
    const { email, name, password } = req.body
    const signupResp = await authService.singup(email, name, password)
    if (signupResp.status === STATUS.SUCCESS) {
      return res.status(200).json(signupResp)
    }
    return res.status(400).json(signupResp)
  }

  /**
   * Managment API request about Sing In
   */
  async signin (req = request, res = response) {
    const { email, password } = req.body
    const signinResp = await authService.signin(email, password)
    if (signinResp.status === STATUS.SUCCESS) {
      return res.status(200).json(signinResp)
    }
    return res.status(400).json(signinResp)
  }

  /**
   * Managment API request about Generate new Token
   */
  async refreshToken (req = request, res = response) {
    // @ts-ignore
    const { uid, name } = req
    const tokenResp = await authService.getNewToken(uid, name)
    if (tokenResp.status === STATUS.SUCCESS) {
      return res.status(200).json(tokenResp)
    }
    return res.status(400).json(tokenResp)
  }
}

module.exports = AuthController
