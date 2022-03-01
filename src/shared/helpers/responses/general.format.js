// @ts-check

// eslint-disable-next-line no-unused-vars
const ActivityFormat = require('./activity.format')
// eslint-disable-next-line no-unused-vars
const AuthFormat = require('./auth.format')
// eslint-disable-next-line no-unused-vars
const ErrorFormat = require('./error.format')
// eslint-disable-next-line no-unused-vars
const UserClass = require('./user.format')

class GeneralFormat {
  /**
   * General format by API response
   * @param {string} status Custom status of execution
   * @param {UserClass | AuthFormat | ActivityFormat | ActivityFormat[] | ErrorFormat[]} message Data solved and details of petition
   */
  constructor (status, message) {
    this.status = status
    this.message = message
    console.log('_>', this.status, this.message)
  }
}

module.exports = GeneralFormat
