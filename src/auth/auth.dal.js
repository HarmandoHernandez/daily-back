// @ts-check
const User = require('../user/user.model')

class AuthDAL {
  /**
   *
   * @param {string} email
   * @returns {Promise<User>}
   */
  async getByEmail (email) {
    // TODO: remodelar para enviar un objeto en espesifico (No el Schema) Para evitar poblemas de tipos
    return await User.findOne({ email })
  }

  async addUser (name, email, password) {
    // TODO: remodelar para enviar un objeto en espesifico (No el Schema) Para evitar poblemas de tipos
    const dbUser = new User({ name, email, password })
    console.log(dbUser)
    return await dbUser.save()
  }
}

module.exports = AuthDAL
