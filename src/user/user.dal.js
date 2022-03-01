// @ts-check
const User = require('./user.model')

const UserFormat = require('../shared/helpers/responses/user.format')

class UserDAL {
  /**
   * Save in DB a new User
   * @param {UserFormat} userData User data
   * @returns {Promise<UserFormat>} User data
   */
  async createOne (userData) {
    const newUser = new User(userData)
    const resp = await newUser.save()
    return this.getUser(resp)
  }

  /**
   * Get user by id from db
   * @param {string} idUser User identification
   * @returns {Promise<UserFormat>} User data
   */
  async getById (idUser) {
    const resp = await User.findById(idUser).populate('activities')
    return this.getUser(resp)
  }

  /**
   * Get user by email from db
   * @param {string} email User email
   * @returns {Promise<UserFormat>} User data
   */
  async getByEmail (email) {
    const resp = await User.findOne({ email })
    return this.getUser(resp)
  }

  /**
   * Includ activity reference from User
   * @param {string} userId User identification
   * @param {string} activityId Activity identification
   * @returns {Promise<UserFormat>} User data
   */
  async includeActivity (userId, activityId) {
    const user = await User.findById(userId)
    // Include activity
    user.activities = user.activities.concat(activityId)
    const resp = await user.save()

    return this.getUser(resp)
  }

  /**
   * Remove activity reference from User
   * @param {string} userId User identification
   * @param {string} activityId Acivity identification
   * @returns {Promise<UserFormat>} User data
   */
  async removeActivity (userId, activityId) {
    const user = await User.findById(userId)
    // Remove activity
    const indexActivityId = user.activities.indexOf(activityId)
    user.activities.splice(indexActivityId, 1)
    const resp = await user.save()

    return this.getUser(resp)
  }

  /**
   * Build a uer with the standart format
   * @param {any} userData User data
   * @returns {UserFormat} User formatted
   */
  getUser (userData) {
    if (userData !== null) {
      const { name, email, password, activities, id } = userData.toJSON()
      return new UserFormat(name, email, password, activities, id)
    }
    return null
  }
}

module.exports = UserDAL
