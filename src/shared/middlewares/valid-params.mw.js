const { response } = require('express')
const { validationResult } = require('express-validator')

const { Error } = require('../models')
const { responseError } = require('../helpers/responses.helper')
const VALIDATORS = require('../enums/validators.enum')

const validParams = (req, res = response, next) => {
  const validtionResults = validationResult(req)
  const errors = validtionResults.array().map(e => new Error(e.msg, e.param))
  if (errors.length > 0) {
    return responseError(res, 400, VALIDATORS.ERROR, errors)
  }

  next()
}

module.exports = {
  validParams
}
