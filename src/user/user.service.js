// @ts-check
const bcrypt = require('bcryptjs')

// Customs
const USER_PARAMS = require('./user.enum')
const STATUS = require('../shared/enums/status.enum')
const VALIDATORS = require('../shared/enums/validators.enum')
const UserDAL = require('./user.dal')
const getAnErrorResponse = require('../shared/helpers/responses/error.response')
const GeneralFormat = require('../shared/helpers/responses/general.format')
// eslint-disable-next-line no-unused-vars
const UserFormat = require('../shared/helpers/responses/user.format')

// Instances
const userDal = new UserDAL()

class UserService {
  /**
   * Logic and format to create new User
   * @param {UserFormat} userData User data
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async createUser (userData) {
    try {
      // Encript password
      const salt = bcrypt.genSaltSync()
      userData.password = bcrypt.hashSync(userData.password, salt)
      // Save user
      const userDb = await userDal.createOne(userData)
      if (userDb !== null) {
        return new GeneralFormat(STATUS.SUCCESS, userDb)
      }
      return getAnErrorResponse(VALIDATORS.CORRUPT, USER_PARAMS.USER)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:CREATE', error)
    }
  }

  /**
   * Logic and format to Get User by id
   * @param {string} id User identification
   * @returns {Promise<GeneralFormat>} Response formatted
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

  /**
   * Logic and format to Get User by email
   * @param {string} email User email
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async getOneByEmail (email) {
    try {
      const userDb = await userDal.getByEmail(email)
      if (userDb !== null) {
        return new GeneralFormat(STATUS.SUCCESS, userDb)
      }
      return getAnErrorResponse(VALIDATORS.NOEXIST, USER_PARAMS.USER)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:GETBYEMAIL', error)
    }
  }

  /**
   * Logic to include activity reference in user
   * @param {string} userId User identification
   * @param {string} activityId Activity identification
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async includeActivity (userId, activityId) {
    try {
      const userDb = await userDal.includeActivity(userId, activityId)
      if (userDb !== null) {
        return new GeneralFormat(STATUS.SUCCESS, userDb)
      }
      return getAnErrorResponse(VALIDATORS.NOEXIST, USER_PARAMS.USER)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:INCLUDACTIVITY', error)
    }
  }

  /**
   * Logic to remove activity reference from user
   * @param {string} userId User identification
   * @param {string} activityId Activity identification
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async removeActivity (userId, activityId) {
    try {
      const userDb = await userDal.removeActivity(userId, activityId)
      if (userDb !== null) {
        return new GeneralFormat(STATUS.SUCCESS, userDb)
      }
      return getAnErrorResponse(VALIDATORS.NOEXIST, USER_PARAMS.USER)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'USER:UPDATE', error)
    }
  }
}

module.exports = UserService
