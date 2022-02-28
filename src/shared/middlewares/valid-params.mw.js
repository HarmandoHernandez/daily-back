// @ts-check
const { response } = require('express')
const { validationResult } = require('express-validator')

const { Error, GeneralFormat } = require('../models')
const { STATUS } = require('../enums')

const validParams = (req, res = response, next) => {
  const validtionResults = validationResult(req)
  const errors = validtionResults.array().map(e => new Error(e.msg, e.param))
  console.log(errors)
  if (errors.length > 0) {
    return res
      .status(400)
      .json(new GeneralFormat(STATUS.ERROR, errors))
  }

  next()
}

module.exports = {
  validParams
}
