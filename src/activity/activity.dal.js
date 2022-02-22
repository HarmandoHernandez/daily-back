// @ts-check
const Activity = require('./activity.model')

class ActivityDAL {
  async getOneById (id) {
    return await Activity.findById(id)
  }

  async createOne (activityData) {
    const newActivity = new Activity(activityData)
    return await newActivity.save()
  }

  async updateOne (activityData) {
    return await Activity.findByIdAndUpdate(activityData.id, activityData, { new: true })
  }

  async deleteOne (id) {
    return await Activity.findByIdAndDelete(id)
  }
}

module.exports = ActivityDAL
