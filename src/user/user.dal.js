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

  /**
   * @param {string} email
   * @returns {Promise<User>}
   */
  async getByEmail (email) {
    return await User.findOne({ email })
  }

  async updateOne (userData) {
    return await User.findByIdAndUpdate(userData.id, userData, { new: true })
  }
}

module.exports = UserDAL
