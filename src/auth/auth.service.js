// @ts-check
const { generateJWT } = require('../shared/helpers/jwt.helper')
const bcrypt = require('bcryptjs')
const AuthDAL = require('./auth.dal')

const {
  Error: CError,
  GeneralFormat,
  SuccessFormat
} = require('../shared/models')

const {
  VALIDATORS,
  AUTH_PARAMS,
  STATUS
} = require('../shared/enums')

const authDal = new AuthDAL()

class AuthService {
  async singup (email, name, password) {
    try {
      const user = await authDal.getByEmail(email)
      if (user !== null) { // Exist account
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.EXIST, AUTH_PARAMS.EMAIL)
        )
      }

      const salt = bcrypt.genSaltSync()
      const passwordHash = bcrypt.hashSync(password, salt)

      const userDb = await authDal.addUser(name, email, passwordHash)
      // @ts-ignore
      const token = await this.getNewToken(userDb._id, name)

      return new GeneralFormat(
        STATUS.SUCCESS,
        // @ts-ignore
        new SuccessFormat(userDb._id, userDb.name, token)
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
      const user = await authDal.getByEmail(email)
      if (user === null) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.WITHOUT, AUTH_PARAMS.EMAIL)
        )
      }
      // @ts-ignore
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.INVALID, AUTH_PARAMS.PASSWORD)
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
