const {
  Error,
  GeneralFormat,
  SuccessFormat
} = require('../models')

const {
  STATUS
} = require('../enums')

const responseError = (
  res,
  statusCode = 500,
  error = STATUS.ERROR,
  param = STATUS.ERROR
) => {
  return res
    .status(statusCode)
    .json(new GeneralFormat(
      [new Error(error, param)]
    ))
}

const responseSuccess = (
  res,
  statusCode = 200,
  uid,
  name,
  token
) => {
  const successRes = new SuccessFormat(uid, name, token)
  return res
    .status(statusCode)
    .json(new GeneralFormat(STATUS.SUCCESS, successRes))
}

module.exports = {
  responseError,
  responseSuccess
}
