// @ts-check
const STATUS_CODES = require('../enums/status-codes.enums')
const VALIDATORS = require('../enums/validators.enum')

/**
 * Eval status to define an HTTP status code
 * @param {string} status Response tatus
 * @returns {number} HTTP status code
 */
const getStatusCode = (status) => {
  let statusCode = STATUS_CODES.NOT_IMPLEMETED
  switch (status) {
    case VALIDATORS.NOEXIST:
      statusCode = STATUS_CODES.NO_CONTENT
      break
    case VALIDATORS.FATAL_ERROR:
      statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
      break
  }

  return statusCode
}

module.exports = getStatusCode
