// @ts-check

// eslint-disable-next-line no-unused-vars
import ErrorFormat from './error.format'
import GeneralFormat from './general.format'
import STATUS from '../../enums/status.enum'

/**
 * Build Error response
 * @param {ErrorFormat[]} errorData Error data
 * @param {string} status Custom status of response
 * @returns {GeneralFormat} Error response
 */
const getErrorResponse = (errorData, status = STATUS.ERROR) => {
  return new GeneralFormat(status, errorData)
}

module.exports = getErrorResponse
