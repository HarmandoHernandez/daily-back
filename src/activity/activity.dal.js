// @ts-check
const ActivityFormat = require('../shared/helpers/responses/activity.format')
const Activity = require('./activity.model')

class ActivityDAL {
  /**
   * Get an activity from db
   * @param {string} id Activity identification
   * @returns {Promise<ActivityFormat>} User data
   */
  async getOneById (id) {
    const resp = await Activity.findById(id)
    return this.getActivity(resp)
  }

  /**
   * Save in BD a new Activity
   * @param {ActivityFormat} activityData Activity data
   * @returns {Promise<ActivityFormat>} Activity data
   */
  async createOne (activityData) {
    const newActivity = new Activity(activityData)
    const resp = await newActivity.save()
    return this.getActivity(resp)
  }

  /**
   * Update activity in BD
   * @param {ActivityFormat} activityData Activity data
   * @returns {Promise<ActivityFormat>} Activity data
   */
  async updateOne (activityData) {
    return await Activity.findByIdAndUpdate(activityData.id, activityData, { new: true })
  }

  /**
   * Delete activity from BD
   * @param {string} id Activity identification
   * @returns {Promise<ActivityFormat>} Activity data
   */
  async deleteOne (id) {
    return await Activity.findByIdAndDelete(id)
  }

  /**
   * Build an Activity with the standart format
   * @param {any} activityData Activity data
   * @returns {ActivityFormat} Activity formatted
   */
  getActivity (activityData) {
    if (activityData !== null) {
      const { icon, title, startTime, durationTime, user, id } = activityData.toJSON()
      return new ActivityFormat(icon, title, startTime, durationTime, user, id)
    }
    return null
  }
}

module.exports = ActivityDAL
