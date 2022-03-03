// @ts-check

// eslint-disable-next-line no-unused-vars
const ErrorFormat = require('./error.format')
const GeneralFormat = require('./general.format')
const STATUS = require('./../../enums/status.enum')

/**
 * Build Error response
 * @param {string} error Error data
 * @param {string} param Custom status of response
 * @returns {GeneralFormat} Error response
 */
const getAnErrorResponse = (error, param, cause = '') => {
  if (error) console.error(cause)
  const errors = []
  errors.push(new ErrorFormat(error, param))
  return new GeneralFormat(STATUS.ERROR, errors)
}

module.exports = getAnErrorResponse
