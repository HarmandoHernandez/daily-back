// @ts-check
const ActivityDAL = require('./activity.dal')
const UserService = require('./../user/user.service')
// eslint-disable-next-line no-unused-vars
const ActivityC = require('./activity')

const activityDAL = new ActivityDAL()

const getErrorResponse = require('./../shared/helpers/responses/error.response')
const { default: ErrorFormat } = require('../shared/helpers/responses/error.format')
const { default: VALIDATORS } = require('../shared/enums/validators.enum')
const { default: ACTIVITY_PARAMS } = require('./activity.enum')
const { default: STATUS } = require('../shared/enums/status.enum')

class ActivityService {
  async getOneById (id) {
    try {
      const activityDb = await activityDAL.getOneById(id)
      if (activityDb === null) {
        const errors = [new ErrorFormat(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)]
        const response = getErrorResponse(errors, STATUS.ERROR)
        return response
      }
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'GET_BY_ID')
      )
    }
  }

  /**
   *
   * @param {ActivityC} activityData
   * @returns {Promise<GeneralFormat>}
   */
  async createOne (activityData) {
    try {
      // TODO: guardar id en collection User
      const activityDb = await activityDAL.createOne(activityData)
      if (activityDb === null) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.INCORRECT, ACTIVITY_PARAMS.ACTIVITY))
      }
      const userService = new UserService()
      await userService.includActivity(activityData.user, activityDb._id)
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'CREATE')
      )
    }
  }

  async updateOne (activityData) {
    try {
      const activityDb = await activityDAL.updateOne(activityData)
      // Si no es null
      if (activityDb === null) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY))
      }
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'CREATE')
      )
    }
  }

  async deleteOne (id) {
    try {
      const activityDb = await activityDAL.deleteOne(id)
      // TODO: Optimizar para todas las funciones
      if (activityDb === null) {
        return new GeneralFormat(
          STATUS.ERROR,
          new CError(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY))
      }
      const userService = new UserService()
      await userService.removeActivity(activityDb.user, activityDb._id)

      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      console.error(error)
      return new GeneralFormat(
        STATUS.ERROR,
        new CError('FATAL_ERROR', 'CREATE')
      )
    }
  }
}

module.exports = ActivityService
