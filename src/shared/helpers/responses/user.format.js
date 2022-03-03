// @ts-check
// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

class UserFormat {
  /**
     * Model class of User
     * @param {string} name
     * @param {string} email
     * @param {string} password
     * @param {any[]} activities
     * @param {ObjectId} id
     */
  constructor (name, email, password, activities, id = null) {
    this.name = name
    this.email = email
    this.password = password
    this.activities = activities
    this.id = id
  }
}

module.exports = UserFormat
