// @ts-check
const bcrypt = require('bcryptjs')

// Customs
const { Error: CError, GeneralFormat } = require('../shared/models')
const { VALIDATORS, STATUS } = require('../shared/enums')
const USER_PARAMS = require('./user.enum')
const UserDAL = require('./user.dal')
// Instances
const userDal = new UserDAL()

class UserService {
  async createUser (userData) {
    try {
      const salt = bcrypt.genSaltSync()
      userData.password = bcrypt.hashSync(userData.password, salt)

      const activityDb = await userDal.createOne(userData)
      // TODO: Validar que no sea null
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'USER:CREATE')
      )
    }
  }

  async getOneById (id) {
    try {
      const userDb = await userDal.getById(id)
      if (userDb === null) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.NOEXIST, USER_PARAMS.USER))
      }
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'USER:GET_BY_ID')
      )
    }
  }

  async getOneByEmail (email) {
    try {
      const userDb = await userDal.getByEmail(email)
      if (userDb === null) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.NOEXIST, USER_PARAMS.USER))
      }
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'USER:GET_BY_ID')
      )
    }
  }

  async includActivity (userId, activityId) {
    try {
      const userDb = await userDal.includActivity(userId, activityId)
      // TODO: Validar que no sea null
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'USER:UPDATE')
      )
    }
  }

  async removeActivity (userId, activityId) {
    try {
      const userDb = await userDal.removeActivity(userId, activityId)
      // TODO: Validar que no sea null
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'USER:UPDATE')
      )
    }
  }
}

module.exports = UserService
