// @ts-check

// eslint-disable-next-line no-unused-vars
import ActivityFormat from './activity.format'
// eslint-disable-next-line no-unused-vars
import AuthFormat from './auth.format'
// eslint-disable-next-line no-unused-vars
import ErrorFormat from './error.format'

export default class GeneralFormat {
  /**
   * General format by API response
   * @param {string} status Custom status of execution
   * @param {AuthFormat | ErrorFormat[] | ActivityFormat | ActivityFormat[]} message Data solved and details of petition
   */
  constructor (status, message) {
    this.status = status
    this.message = message
  }
}
