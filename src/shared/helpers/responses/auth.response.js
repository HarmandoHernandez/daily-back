// @ts-check

// eslint-disable-next-line no-unused-vars
const AuthFormat = require('./auth.format')
const GeneralFormat = require('./general.format')
const STATUS = require('../../enums/status.enum')

/**
 * Build Auth response
 * @param {AuthFormat} authData Auth data
 * @returns {GeneralFormat} Auth response
 */
const getAuthResponse = (authData) => {
  return new GeneralFormat(STATUS.SUCCESS, authData)
}

module.exports = getAuthResponse
