// @ts-check
const bcrypt = require('bcryptjs')

// Customs
const USER_PARAMS = require('./user.enum')
const UserDAL = require('./user.dal')
const getAnErrorResponse = require('../shared/helpers/responses/error.response')
const VALIDATORS = require('../shared/enums/validators.enum')
const GeneralFormat = require('../shared/helpers/responses/general.format')
const STATUS = require('../shared/enums/status.enum')
// Instances
const userDal = new UserDAL()

class UserService {
  async createUser (userData) {
    try {
      const salt = bcrypt.genSaltSync()
      userData.password = bcrypt.hashSync(userData.password, salt)

      const userDb = await userDal.createOne(userData)
      if (userDb === null) {
        return getAnErrorResponse(VALIDATORS.CORRUPT, USER_PARAMS.USER)
      }
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:CREATE', error)
    }
  }

  /**
   * Logic and format to Get User by id
   * @param {string} id User identification
   * @returns {Promise<GeneralFormat>} Response format
   */
  async getOneById (id) {
    try {
      const user = await userDal.getById(id)
      if (user !== null) {
        return new GeneralFormat(STATUS.SUCCESS, user)
      }
      return getAnErrorResponse(VALIDATORS.NOEXIST, USER_PARAMS.USER)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:GETBYID', error)
    }
  }

  async getOneByEmail (email) {
    try {
      const userDb = await userDal.getByEmail(email)
      if (userDb === null) {
        return getAnErrorResponse(VALIDATORS.NOEXIST, USER_PARAMS.USER)
      }
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:GETBYEMAIL', error)
    }
  }

  async includActivity (userId, activityId) {
    try {
      const userDb = await userDal.includActivity(userId, activityId)
      // TODO: Validar que no sea null
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:INCLUDACTIVITY', error)
    }
  }

  async removeActivity (userId, activityId) {
    try {
      const userDb = await userDal.removeActivity(userId, activityId)
      // TODO: Validar que no sea null
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:UPDATE', error)
    }
  }
}

module.exports = UserService
