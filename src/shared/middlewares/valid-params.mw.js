// @ts-check
// eslint-disable-next-line no-unused-vars
const { request, response } = require('express')
const { validationResult } = require('express-validator')
// Custom
const STATUS_CODES = require('../enums/status-codes.enums')
const STATUS = require('../enums/status.enum')
const ErrorFormat = require('../helpers/responses/error.format')
const GeneralFormat = require('../helpers/responses/general.format')

/**
 * Evaluate the request result with express validator
 * @param {request} req API Request
 * @param {response} res API Response
 * @param {any} next
 * @returns any
 */
const validParams = (req, res, next) => {
  const validtionResults = validationResult(req)
  // Get errors
  const errors = validtionResults.array().map(e => new ErrorFormat(e.msg, e.param))
  if (errors.length > 0) {
    console.error(errors)
    const errorRespose = new GeneralFormat(STATUS.ERROR, errors)
    return res.status(STATUS_CODES.PARTIAL_CONTENT).json(errorRespose)
  }
  next()
}

module.exports = validParams
