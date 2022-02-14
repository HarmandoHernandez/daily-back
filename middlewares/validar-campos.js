const { response } = require('express')
const { validationResult } = require('express-validator')
const { GeneralFormat } = require('../models/Response')

const STATUS = require('../enums/status')
const Error = require('../models/Error')

const validarCampos = (req, res = response, next) => {
  const validErrors = validationResult(req)
  const errors = validErrors.array().map(e => new Error(e.msg, e.param))
  if (errors.length > 0) {
    return res
      .status(400)
      .json(new GeneralFormat(STATUS.ERROR, errors))
  }

  next()
}

module.exports = {
  validarCampos
}
