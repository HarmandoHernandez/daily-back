// @ts-check

const generateJWT = require('../shared/helpers/jwt.helper')
const bcrypt = require('bcryptjs')
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

const GeneralFormat = require('../shared/helpers/responses/general.format')
const UserService = require('./../user/user.service')

const AUTH_PARAMS = require('./auth.enum')
const USER_PARAMS = require('./../user/user.enum')
const STATUS = require('../shared/enums/status.enum')
const VALIDATORS = require('../shared/enums/validators.enum')

const getAnErrorResponse = require('../shared/helpers/responses/error.response')
const UserFormat = require('../shared/helpers/responses/user.format')
const AuthFormat = require('../shared/helpers/responses/auth.format')

// Instances
const userService = new UserService()

class AuthService {
  /**
   * Register new acount in app
   * @param {string} email User email
   * @param {string} name User name
   * @param {string} password User password
   * @returns {Promise<GeneralFormat>} General response
   */
  async singup (email, name, password) {
    try {
      // Check non-duplicate user in DB
      const userResp = await userService.getOneByEmail(email)
      if (userResp.status === STATUS.SUCCESS) {
        return getAnErrorResponse(VALIDATORS.EXIST, USER_PARAMS.USER)
      }

      // Create user in DB
      const userData = new UserFormat(name, email, password, [])

      const userCreated = await userService.createUser(userData)

      if (userCreated.status !== STATUS.SUCCESS) return userCreated

      /** @type {UserFormat} */
      // @ts-ignore
      const user = userCreated.message

      // Get token
      const tokenResp = await this.getNewToken(user.id, user.name)
      if (tokenResp.status !== STATUS.SUCCESS) return tokenResp
      // @ts-ignore
      const token = tokenResp.message.token

      // Response
      const auth = new AuthFormat(user.id, user.name, token)
      return new GeneralFormat(STATUS.SUCCESS, auth)
      // return getAuthResponse({ id: , name:  })
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'SIGNUP', error)
    }
  }

  /**
   * Start session in app
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise<GeneralFormat>} General Response
   */
  async signin (email, password) {
    try {
      // Chech user exist in DB
      const userResp = await userService.getOneByEmail(email)
      if (userResp.status === STATUS.ERROR) return userResp

      // @ts-ignore
      const { id, name, password: pwd } = userResp.message
      // Comparate Passwords
      const validPassword = bcrypt.compareSync(password, pwd)
      if (!validPassword) {
        return getAnErrorResponse(VALIDATORS.INVALID, USER_PARAMS.PASSWORD)
      }

      // Get token
      const tokenResp = await this.getNewToken(id, name)
      if (tokenResp.status !== STATUS.SUCCESS) return tokenResp
      // @ts-ignore
      const token = tokenResp.message.token

      // Response
      const auth = new AuthFormat(id, name, token)
      return new GeneralFormat(STATUS.SUCCESS, auth)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'SIGNIN', error)
    }
  }

  /**
   * Refresh token or generate new token of an user
   * @param {ObjectId} id User identification
   * @param {string} name User name
   * @returns New token
   */
  async getNewToken (id, name) {
    try {
      const token = await generateJWT(id, name)
      if (token.length === 0) {
        return getAnErrorResponse(VALIDATORS.FATAL_ERROR, AUTH_PARAMS.TOKEN)
      }
      // Response
      const auth = new AuthFormat(id, name, token)
      return new GeneralFormat(STATUS.SUCCESS, auth)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'NEWTOKEN', error)
    }
  }
}

module.exports = AuthService
