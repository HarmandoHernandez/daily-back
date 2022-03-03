// @ts-check
// Customs
const ActivityDAL = require('./activity.dal')
const UserService = require('./../user/user.service')
const VALIDATORS = require('../shared/enums/validators.enum')
const STATUS = require('../shared/enums/status.enum')
const ACTIVITY_PARAMS = require('./activity.enum')
// eslint-disable-next-line no-unused-vars
const GeneralFormat = require('../shared/helpers/responses/general.format')
// eslint-disable-next-line no-unused-vars
const ActivityFormat = require('../shared/helpers/responses/activity.format')
const getAnErrorResponse = require('../shared/helpers/responses/error.response')

// Instances
const activityDAL = new ActivityDAL()

class ActivityService {
  /**
   * Logic and format to get Activity by id
   * @param {string} id Activity identification
   * @returns {Promise<GeneralFormat>} Response format
   */
  async getOneById (id) {
    try {
      const activityDb = await activityDAL.getOneById(id)
      if (activityDb !== null) {
        return new GeneralFormat(STATUS.SUCCESS, activityDb)
      }
      return getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:GETBYID', error)
    }
  }

  /**
   * Logic and format to create new Activity
   * @param {ActivityFormat} activityData Activity data
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async createOne (activityData) {
    try {
      // Create activity
      const activityDb = await activityDAL.createOne(activityData)
      if (activityDb === null) {
        return getAnErrorResponse(VALIDATORS.INCORRECT, ACTIVITY_PARAMS.ACTIVITY)
      }

      // Include Activity identificator to owner User
      const userService = new UserService()
      const activityIncluded = await userService.includeActivity(activityData.user, activityDb.id)

      if (activityIncluded.status === STATUS.ERROR) {
        return activityIncluded
      }
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:CREATE', error)
    }
  }

  /**
   * Logic and format to update Activity
   * @param {ActivityFormat} activityData Activity data
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async updateOne (activityData) {
    try {
      // Update activity
      const activityDb = await activityDAL.updateOne(activityData)
      if (activityDb !== null) {
        return new GeneralFormat(STATUS.SUCCESS, activityDb)
      }
      return getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:UPDATE', error)
    }
  }

  /**
   * Logic to delete an Activity
   * @param {string} id Activity identification
   * @returns {Promise<GeneralFormat>} Response formatted
   */
  async deleteOne (id) {
    try {
      // Delete activity
      const activityDb = await activityDAL.deleteOne(id)
      if (activityDb === null) {
        return getAnErrorResponse(VALIDATORS.NOEXIST, ACTIVITY_PARAMS.ACTIVITY)
      }

      // Delete Activity identificator of owner user
      const userService = new UserService()
      const activityIncluded = await userService.removeActivity(activityDb.user, activityDb.id)

      if (activityIncluded.status === STATUS.ERROR) {
        return activityIncluded
      }
      return new GeneralFormat(STATUS.SUCCESS, activityDb)
    } catch (error) {
      return getAnErrorResponse(VALIDATORS.FATAL_ERROR, 'ACTIVITY:DELETE', error)
    }
  }

  /**
   * Logic and format to get Activity Owner
   * @param {string} id Activity identification
   * @returns {Promise<import('mongoose').ObjectId>} Response format
   */
  async getActivityOwner (id) {
    try {
      return await activityDAL.getActivityOwner(id)
    } catch (error) {
      return null
    }
  }
}

module.exports = ActivityService
