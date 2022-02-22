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
  async updateUser (userData) {
    try {
      const userDb = await userDal.updateOne(userData)
      return new GeneralFormat(STATUS.SUCCESS, userDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'USER:UPDATE')
      )
    }
  }

  async createUser (userData) {
    try {
      const salt = bcrypt.genSaltSync()
      userData.password = bcrypt.hashSync(userData.password, salt)

      const activityDb = await userDal.createOne(userData)
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
}

module.exports = UserService
