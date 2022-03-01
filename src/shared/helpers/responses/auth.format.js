// @ts-check

// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

class AuthFormat {
  /**
     * Auth format by API response
     * @param {ObjectId} id User identification
     * @param {string} name User name
     * @param {string} token User token
     */
  constructor (id, name, token) {
    this.id = id
    this.name = name
    this.token = token
  }
}

module.exports = AuthFormat
