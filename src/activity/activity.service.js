// @ts-check
const ActivityDAL = require('./activity.dal')
// eslint-disable-next-line no-unused-vars
const ActivityC = require('./activity')

const {
  Error: CError,
  GeneralFormat
} = require('../shared/models')

const {
  VALIDATORS,
  ACTIVITY_PARAMS,
  STATUS
} = require('../shared/enums')

const activityDAL = new ActivityDAL()

class ActivityService {
  async getOneById (id) {
    try {
      const activityDb = await activityDAL.getOneById(id)
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
