// @ts-check
const User = require('./user.model')

const UserFormat = require('../shared/helpers/responses/user.format')

class UserDAL {
  async createOne (userData) {
    const newUser = new User(userData)
    return await newUser.save()
  }

  /**
   * Get user from db
   * @param {string} idUser User identification
   * @returns {Promise<UserFormat>} User data
   */
  async getById (idUser) {
    const resp = await User.findById(idUser).populate('activities')
    if (resp !== null) {
      const { name, email, password, activities, id } = resp.toJSON()
      return new UserFormat(name, email, password, activities, id)
    }
    return null
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
