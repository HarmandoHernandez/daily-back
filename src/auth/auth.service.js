// @ts-check

const generateJWT = require('../shared/helpers/jwt.helper')
const bcrypt = require('bcryptjs')
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

// eslint-disable-next-line no-unused-vars
const GeneralFormat = require('../shared/helpers/responses/general.format')
const UserService = require('./../user/user.service')

const AUTH_PARAMS = require('./auth.enum')
const USER_PARAMS = require('./../user/user.enum')
const STATUS = require('../shared/enums/status.enum')
const VALIDATORS = require('../shared/enums/validators.enum')

const getAnErrorResponse = require('../shared/helpers/responses/error.response')
const getAuthResponse = require('../shared/helpers/responses/auth.response')

// Instances
const userService = new UserService()

class AuthService {
  // TODO: Definir modelo diferente al Schema
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
      if (
        userResp.status !== STATUS.ERROR &&
        userResp.message.error !== VALIDATORS.NOEXIST
      ) {
        return getAnErrorResponse(VALIDATORS.EXIST, USER_PARAMS.USER)
      }
      // Create user in DB
      const userData = { email, name, password }
      const userCreated = await userService.createUser(userData)
      if (userCreated.status !== STATUS.SUCCESS) return userCreated

      const user = userResp.message

      // Get token
      const tokenResp = await this.getNewToken(user._id, user.name)
      if (tokenResp.status !== STATUS.SUCCESS) return tokenResp
      // @ts-ignore
      const token = tokenResp.message.token

      // Response
      return getAuthResponse({ uid: user._id, name: user.name, token })
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

      const { _id: uid, name, password: pwd } = userResp.message

      // Comparate Passwords
      // @ts-ignore
      const validPassword = bcrypt.compareSync(password, pwd)
      if (!validPassword) {
        return getAnErrorResponse(VALIDATORS.INVALID, AUTH_PARAMS.PASSWORD)
      }

      // Get token
      const tokenResp = await this.getNewToken(uid, name)
      if (tokenResp.status !== STATUS.SUCCESS) return tokenResp
      // @ts-ignore
      const token = tokenResp.message.token

      // Response
      return getAuthResponse({ uid, name, token })
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'SIGNIN', error)
    }
  }

  /**
   * Refresh token or generate new token of an user
   * @param {ObjectId} uid User identification
   * @param {string} name User name
   * @returns New token
   */
  async getNewToken (uid, name) {
    try {
      const token = await generateJWT(uid, name)
      if (token.length === 0) {
        return getAnErrorResponse(VALIDATORS.FATAL_ERROR, AUTH_PARAMS.TOKEN)
      }
      // Response
      return getAuthResponse({ uid, name, token })
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'NEWTOKEN', error)
    }
  }
}

module.exports = AuthService
