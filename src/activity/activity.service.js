// @ts-check
// Customs
const ActivityDAL = require('./activity.dal')
const UserService = require('./../user/user.service')
const VALIDATORS = require('../shared/enums/validators.enum')
const STATUS = require('../shared/enums/status.enum')
const ACTIVITY_PARAMS = require('./activity.enum')
// eslint-disable-next-line no-unused-vars
const GeneralFormat = require('../shared/helpers/responses/general.format')
const getAnErrorResponse = require('../shared/helpers/responses/error.response')

// Instances
const activityDAL = new ActivityDAL()

class ActivityService {
  async getOneById (id) {
    try {
      const activityDb = await activityDAL.getOneById(id)
      if (activityDb === null) {
        return getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
      }

      // Response
      /* const authData = new ActivityFormat(
        activityDb._id,
        activityDb.icon,
        activityDb.title,
        activityDb.startTime,
        activityDb.durationTime,
        activityDb.user
      ) */
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:GETBYID', error)
    }
  }

  async createOne (activityData) {
    try {
      // Create activity
      const activityDb = await activityDAL.createOne(activityData)
      if (activityDb === null) {
        return getAnErrorResponse(VALIDATORS.INCORRECT, ACTIVITY_PARAMS.ACTIVITY)
      }

      // Include Activity identificator to owner User
      const userService = new UserService()
      await userService.includActivity(activityData.user, activityDb._id)

      // Response
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:CREATE', error)
    }
  }

  async updateOne (activityData) {
    try {
      // Update activity
      const activityDb = await activityDAL.updateOne(activityData)
      if (activityDb === null) {
        return getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
      }
      // Response
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:UPDATE', error)
    }
  }

  async deleteOne (id) {
    try {
      // Delete activity
      const activityDb = await activityDAL.deleteOne(id)
      if (activityDb === null) {
        return getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
      }

      // Delete Activity identificator of owner user
      const userService = new UserService()
      await userService.removeActivity(activityDb.user, activityDb._id)

      // Response
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:DELETE', error)
    }
  }
}

module.exports = ActivityService
