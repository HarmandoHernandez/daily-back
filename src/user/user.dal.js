// @ts-check
const User = require('./user.model')

class UserDAL {
  async createOne (userData) {
    const newUser = new User(userData)
    return await newUser.save()
  }

  async getById (id) {
    return await User.findById(id).populate('activities')
  }

  async getByEmail (email) {
    return await User.findOne({ email })
  }

  async includActivity (userId, activityId) {
    const user = await User.findById(userId)
    user.activities = user.activities.concat(activityId)
    return await user.save()
  }

  async removeActivity (userId, activityId) {
    const user = await User.findById(userId)
    const indexActivityId = user.activities.indexOf(activityId)
    user.activities.splice(indexActivityId, 1)
    return await user.save()
  }
}

module.exports = UserDAL
