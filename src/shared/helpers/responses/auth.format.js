// @ts-check

// eslint-disable-next-line no-unused-vars
const { ObjectId } = require('mongoose')

class AuthFormat {
  /**
     * Auth format by API response
     * @param {ObjectId} uid User identification
     * @param {string} name User name
     * @param {string} token User token
     */
  constructor (uid, name, token) {
    this.uid = uid
    this.name = name
    this.token = token
  }
}

module.exports = AuthFormat
