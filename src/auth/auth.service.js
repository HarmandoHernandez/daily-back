// @ts-check

// TODO: ESTANDARIZAR RESPUESTAS:
/**
 * NO SEA POSIBLE OTRO TIPO DE RESCPUESTA SI NO ESTAN ESTANDARIZADAS EN UN UTIL
 * HACER MODELO PARA SUCCESS Y ERROR
 */
const { generateJWT } = require('../shared/helpers/jwt.helper')
const bcrypt = require('bcryptjs')
const UserService = require('./../user/user.service')
// Instances
const userService = new UserService()

const {
  Error: CError,
  GeneralFormat,
  SuccessFormat
} = require('../shared/models')

const {
  VALIDATORS,
  STATUS
} = require('../shared/enums')
const AUTH_PARAMS = require('./auth.enum')
const USER_PARAMS = require('./../user/user.enum')

class AuthService {
  // TODO: Definir modelo diferente al Schema
  /**
   *
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @returns {Promise<GeneralFormat>}
   */
  async singup (email, name, password) {
    try {
      const respGetByEmail = await userService.getOneByEmail(email)
      if (respGetByEmail.status !== STATUS.ERROR &&
        respGetByEmail.message.error !== VALIDATORS.NOEXIST
      ) {
        return new GeneralFormat(
          STATUS.ERROR,
          [new CError(VALIDATORS.EXIST, USER_PARAMS.USER)])
      }

      const userData = { email, name, password }
      const respCreateUser = await userService.createUser(userData)
      console.log(respCreateUser)
      if (respCreateUser.status !== STATUS.SUCCESS) return respCreateUser
      // @ts-ignore
      const token = await this.getNewToken(respCreateUser.message._id, respCreateUser.message.name)

      return new GeneralFormat(
        STATUS.SUCCESS,
        // @ts-ignore
        new SuccessFormat(respCreateUser.message._id, respCreateUser.message.name, token)
      )
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'SIGNUP')
      )
    }
  }

  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<GeneralFormat>}
   */
  async signin (email, password) {
    try {
      const respGetByEmail = await userService.getOneByEmail(email)
      if (respGetByEmail.status === STATUS.ERROR) return respGetByEmail

      const user = respGetByEmail.message
      // @ts-ignore
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        // TODO: Simplificar usando el helpers/repinses.helper.js
        return new GeneralFormat(
          STATUS.ERROR,
          // TODO: Al ser error, debe de enviar un arreglo con errores
          [new CError(VALIDATORS.INVALID, AUTH_PARAMS.PASSWORD)]
        )
      }
      // @ts-ignore
      const token = await this.getNewToken(user._id, user.name)
      return new GeneralFormat(
        STATUS.SUCCESS,
        // @ts-ignore
        new SuccessFormat(user._id, user.name, token)
      )
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'SIGNIN')
      )
    }
  }

  async getNewToken (uid, name) {
    return await generateJWT(uid, name)
  }
}

module.exports = AuthService
